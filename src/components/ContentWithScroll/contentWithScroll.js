import React, { PureComponent, Fragment } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../Loader/loader';
import './contentWithScroll.scss';

export default class ContentWithScroll extends PureComponent {

  // URI del API de mercadolibre
  static API = 'https://api.mercadolibre.com';
  // Cantidad de items a mostrar por iteración
  static LIMIT_ITEMS = 20;

  // Default State
  state = {
    results: [],
    hasMore: true
  };

  /**
   * Antes de renderizar se realiza una llamada al endpoint de search para obtener los primeros 20 items...
   */
  async componentDidMount() {
    const { data: { paging: { total, offset }, results } } = await this.getItems(this.props.query);
    this.setState({ results, hasMore: results.length > 0, total, offset });
  }

  /**
   * Se toma el componente del props para iterar...
   */
  render() {
    const Component = this.props.component;
    return (
      <Fragment>
        <InfiniteScroll
          className="wrapperInfiniteScroll"
          dataLength={this.state.results.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<Loader />}>
          {this.state.results.map((item, index) => <Component {...item} key={index} />)}
        </InfiniteScroll>
      </Fragment>
    );
  }

   /**
   * Método para verificar si hay que buscar mas items en el caso
   * que todavia queden items se realiza la llamada a la API, sino termina
   * @returns void
   */
  fetchMoreData = async () => {
    if (this.state.results.length >= this.state.total) {
      this.setState({ hasMore: false });
      return;
    } else {
      const newOffset = this.state.offset + ContentWithScroll.LIMIT_ITEMS;
      try {
        console.info('fetching more items...');
        const { data: { paging: { offset }, results } } = await this.getItems(this.props.query, newOffset);
        this.setState({ results: [...this.state.results, ...results], offset });
      } catch (err) {
        console.error('Error al obtener más resultados...', err);
        this.setState({ hasMore: false });
      }
    }
  };

  /**
   * Método para obtener los items, realiza el paginado limitando el offset
   * @param {string} query
   * @param {number} offset
   */
  getItems = async (query, offset = 0) => {
    return await axios.get(`${ContentWithScroll.API}/sites/MLA/search`, {
      params: {
        q: query,
        paging: true,
        limit: ContentWithScroll.LIMIT_ITEMS,
        offset: offset
      }
    });
  };

}
