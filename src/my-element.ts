import { ScopedElementsMap, ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js'
import { Grid, GridColumn, GridFilterColumn, GridSelectionColumn, GridSortColumn } from '@sl-design-system/grid'
import { LitElement, css, html } from 'lit'
import { customElement, query } from 'lit/decorators.js'

interface Foo {
  description: string;
  code: string;
}

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends ScopedElementsMixin(LitElement) {


  static get scopedElements(): ScopedElementsMap {
    return {
      'sl-grid': Grid,
      'sl-grid-column': GridColumn,
      'sl-grid-filter-column': GridFilterColumn,
      'sl-grid-selection-column': GridSelectionColumn,
      'sl-grid-sort-column': GridSortColumn
    };
  }

  render() {
    const items: Foo[] = [{ description: 'B', code: 'b' }, { description: 'a', code: 'A' }, { description: 'c', code: 'C' }];

    const sort = (a: Foo, b: Foo) => a.description.toLocaleLowerCase().localeCompare(b.description.toLocaleLowerCase());

    // console.log('rendering', [...items].sort(sort));

    return html`
      <sl-grid .items=${items}>
      <sl-grid-sort-column path="description" direction="asc" .sorter=${sort}></sl-grid-sort-column>
      <sl-grid-sort-column path="code"></sl-grid-sort-column>

      </sl-grid>
    `
  }

  static styles = css`
    body {
      padding-block-end: 0 !important;
    }
    .scroller {
      block-size: calc(100dvh - 1rem);
      overflow: auto;
    }
    sl-grid {
      inline-size: fit-content;
      margin-block-end: 1rem;

      &::part(tbody) {
        min-width: var(--sl-grid-row-width) !important;
        overflow: visible;
      }
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
