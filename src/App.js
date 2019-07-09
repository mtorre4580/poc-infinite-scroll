import React from 'react';
import ContentWithScroll from '../src/components/ContentWithScroll/contentWithScroll';
import Item from '../src/components/Item/item';

export default function() {
  return (
    <ContentWithScroll query="lapicera" component={Item} />
  );
}
