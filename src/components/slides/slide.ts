import { Component, h } from '../../index';

 /**
  * @name Slide
  * @description
  * The Slide component is a child component of [Slides](../Slides). The template
  * should be written as `ion-slide`. Any slide content should be written
  * in this component and it should be used in conjunction with [Slides](../Slides).
  *
  * See the [Slides API Docs](../Slides) for more usage information.
  *
  * @demo /docs/demos/src/slides/
  * @see {@link /docs/api/components/slides/Slides/ Slides API Docs}
  */
@Component({
  tag: 'ion-slide',
  styleUrls: {
    ios: 'slide.ios.scss',
    md: 'slide.md.scss',
    wp: 'slide.wp.scss'
  }
})
export class Slide {
  render() {
    return h(this, 
      h('div', {
          class: {
            'slide-zoom': true
          }
        },
        h('slot')
      )
    );
  }
}
