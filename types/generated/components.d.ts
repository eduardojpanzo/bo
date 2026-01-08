import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksHero extends Struct.ComponentSchema {
  collectionName: 'components_blocks_heroes';
  info: {
    displayName: 'hero';
    icon: 'expand';
  };
  attributes: {
    cover: Schema.Attribute.Media<'images'>;
    heading: Schema.Attribute.String;
    href: Schema.Attribute.String;
    paragraphs: Schema.Attribute.Component<'elements.text', true>;
  };
}

export interface ElementsCard extends Struct.ComponentSchema {
  collectionName: 'components_elements_cards';
  info: {
    displayName: 'card';
    icon: 'apps';
  };
  attributes: {
    description: Schema.Attribute.Text;
    href: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_links';
  info: {
    displayName: 'link';
    icon: 'link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.Media<'images'>;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsText extends Struct.ComponentSchema {
  collectionName: 'components_elements_texts';
  info: {
    displayName: 'text';
    icon: 'filter';
  };
  attributes: {
    text: Schema.Attribute.Text;
  };
}

export interface SeoMetaData extends Struct.ComponentSchema {
  collectionName: 'components_seo_meta_data';
  info: {
    displayName: 'metaData';
    icon: 'search';
  };
  attributes: {
    description: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.hero': BlocksHero;
      'elements.card': ElementsCard;
      'elements.link': ElementsLink;
      'elements.text': ElementsText;
      'seo.meta-data': SeoMetaData;
    }
  }
}
