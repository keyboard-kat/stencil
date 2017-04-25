import Swiper from 'swiper';
import { Component, h, Ionic, Prop } from '../../index';

/**
 * @name Slides
 * @description
 * The Slides component is a multi-section container. Each section can be swiped
 * or dragged between. It contains any number of [Slide](../Slide) components.
 *
 *
 * ### Creating
 * You should use a template to create slides and listen to slide events. The template
 * should contain the slide container, an `<ion-slides>` element, and any number of
 * [Slide](../Slide) components, written as `<ion-slide>`. Basic configuration
 * values can be set as input properties, which are listed below. Slides events
 * can also be listened to such as the slide changing by placing the event on the
 * `<ion-slides>` element. See [Usage](#usage) below for more information.
 *
 *
 * ### Navigating
 * After creating and configuring the slides, you can navigate between them
 * by swiping or calling methods on the `Slides` instance. You can call `slideTo()` to
 * navigate to a specific slide, or `slideNext()` to change to the slide that follows
 * the active slide. All of the [methods](#instance-members) provided by the `Slides`
 * instance are listed below. See [Usage](#usage) below for more information on
 * navigating between slides.
 *
 *
 * @usage
 *
 * You can add slides to a `@Component` using the following template:
 *
 * ```html
 * <ion-slides>
 *   <ion-slide>
 *     <h1>Slide 1</h1>
 *   </ion-slide>
 *   <ion-slide>
 *     <h1>Slide 2</h1>
 *   </ion-slide>
 *   <ion-slide>
 *     <h1>Slide 3</h1>
 *   </ion-slide>
 * </ion-slides>
 * ```
 *
 * Next, we can use `ViewChild` to assign the Slides instance to
 * your `slides` property. Now we can call any of the `Slides`
 * [methods](#instance-members), for example we can use the Slide's
 * `slideTo()` method in order to navigate to a specific slide on
 * a button click. Below we call the `goToSlide()` method and it
 * navigates to the 3rd slide:
 *
 * ```ts
 * import { ViewChild } from '@angular/core';
 * import { Slides } from 'ionic-angular';
 *
 * class MyPage {
 *   @ViewChild(Slides) slides: Slides;
 *
 *   goToSlide() {
 *     this.slides.slideTo(2, 500);
 *   }
 * }
 * ```
 *
 * We can also add events to listen to on the `<ion-slides>` element.
 * Let's add the `ionSlideDidChange` event and call a method when the slide changes:
 *
 * ```html
 * <ion-slides (ionSlideDidChange)="slideChanged()">
 * ```
 *
 * In our class, we add the `slideChanged()` method which gets the active
 * index and prints it:
 *
 * ```ts
 * class MyPage {
 *   ...
 *
 *   slideChanged() {
 *     let currentIndex = this.slides.getActiveIndex();
 *     console.log("Current index is", currentIndex);
 *   }
 * }
 * ```
 *
 * @advanced
 *
 * There are several options available to create customized slides. Ionic exposes
 * the most commonly used options as [inputs](http://learnangular2.com/inputs/).
 * In order to use an option that isn't exposed as an input the following code
 * should be used, where `freeMode` is the option to change:
 *
 * ```ts
 * import { ViewChild } from '@angular/core';
 * import { Slides } from 'ionic-angular';

 * class MyPage {
 *   @ViewChild(Slides) slides: Slides;
 *
 *   ngAfterViewInit() {
 *     this.slides.freeMode = true;
 *   }
 * }
 *
 * ```
 *
 * To see all of the available options, take a look at the
 * [source for slides](https://github.com/driftyco/ionic/blob/master/src/components/slides/slides.ts).
 *
 * @demo /docs/demos/src/slides/
 * @see {@link /docs/components#slides Slides Component Docs}
 *
 * Adopted from Swiper.js:
 * The most modern mobile touch slider and framework with
 * hardware accelerated transitions.
 *
 * http://www.idangero.us/swiper/
 *
 * Copyright 2016, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under MIT
 */


@Component({
  tag: 'ion-slides',
  styleUrls: {
    ios: 'slides.ios.scss',
    md: 'slides.md.scss',
    wp: 'slides.wp.scss'
  }
})
export class Slides {
  swiper: Swiper;
  $el: HTMLElement;

  /**
   * @input {string} The animation effect of the slides.
   * Possible values are: `slide`, `fade`, `cube`, `coverflow` or `flip`.
   * Default: `slide`.
   */
  @Prop() effect: string = 'slide';

  /**
   * @input {number} Delay between transitions (in milliseconds). If this
   * parameter is not passed, autoplay is disabled. Default does
   * not have a value and does not autoplay.
   * Default: `null`.
   */
  @Prop() autoplay: number;

  /**
   * @input {Slides} Pass another Slides instance or array of Slides instances
   * that should be controlled by this Slides instance.
   * Default: `null`.
   */
  @Prop() control: Slides | Slides[] = null;

  /**
   * @input {string}  Swipe direction: 'horizontal' or 'vertical'.
   * Default: `horizontal`.
   */
  @Prop() direction: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * @input {number}  Index number of initial slide. Default: `0`.
   */
  @Prop() initialSlide: number = 0;

  
  /**
   * @input {boolean} If true, continuously loop from the last slide to the
   * first slide.
   */
  @Prop() loop: boolean = false;
  
  
  /**
   * @input {boolean}  If true, show the pager.
   */
  @Prop() pager: boolean;
  
  
  /**
   * @input {string}  Type of pagination. Possible values are:
   * `bullets`, `fraction`, `progress`. Default: `bullets`.
   * (Note that the pager will not show unless `pager` input
   * is set to true).
   */
  @Prop() paginationType: string = 'bullets'; 
  
  
  /**
   * @input {boolean} If true, allows you to use "parallaxed" elements inside of
   * slider.
   */
  @Prop() parallax: boolean = false;

  /**
   * @input {number} Slides per view. Slides visible at the same time. Default: `1`.
   */
  @Prop() slidesPerView: number | 'auto' = 1;

  /**
   * @input {number} Distance between slides in px. Default: `0`.
   */ 
  @Prop() spaceBetween: number = 0;
  
  /**
   * @input {number} Duration of transition between slides
   * (in milliseconds). Default: `300`.
   */
  @Prop() speed: number = 300;
  

  /**
   * @input {boolean} If true, enables zooming functionality.
   */
  @Prop() zoom: boolean;

  /**
   * @input {boolean} If true, enables keyboard control
   */
  @Prop() keyboardControl: boolean;


  render() {
    return h(this, 
      h('div', {
          class: {
            'swiper-container': true
          },
          'data-dir': 'rtl'
        },
        [
          h('div', {
              class: {
                'swiper-wrapper': true
              }
            },
            h('slot')
          ),
          h('div', {
            class: {
              'swiper-pagination': true,
              'hide': !this.pager
            }
          })
        ]
      )
    );
  }

  /**
   * @hidden
   * Height of container.
   */
  height: number;

  /**
   * @hidden
   * Width of container.
   */
  width: number;

  /**
   * @hidden
   * Enabled this option and swiper will be operated as usual except it will
   * not move, real translate values on wrapper will not be set. Useful when
   * you may need to create custom slide transition.
   */
  virtualTranslate = false;

  /**
   * @hidden
   * Set to true to round values of slides width and height to prevent blurry
   * texts on usual resolution screens (if you have such)
   */
  roundLengths = false;

  // Slides grid

  /**
   * @hidden
   */
  originalEvent: any;

  emitEvent(eventName: string) {
    return (data: any) => {
      Ionic.emit(this, eventName, data);
    };
  }


  /**
   * Private properties only useful to this class.
   * ------------------------------------
   */
  private _init: boolean;
  private _tmr: number;

  /**
   * Properties that are exposed publically but no docs.
   * ------------------------------------
   */
  /** @hidden */
  container: HTMLElement;
  /** @hidden */
  id: number;
  /** @hidden */
  renderedHeight: number;
  /** @hidden */
  renderedWidth: number;
  /** @hidden */
  slideId: string;
  /** @hidden */
  swipeDirection: string;
  /** @hidden */
  velocity: number;


  /**
   * Properties which are for internal use only
   * and not exposed to the public
   * ------------------------------------
   */

  /** @hidden */
  nextButton: HTMLElement;
  /** @hidden */
  prevButton: HTMLElement;



  constructor(
  ) {
    this.id = ++slidesId;
    this.slideId = 'slides-' + this.id;
  }

  private _initSlides() {
    if (!this._init) {
      console.debug(`ion-slides, init`);

      this.container = <HTMLElement>this.$el.shadowRoot.childNodes[1];
      this.container.children = this.$el.children[0].children[0].assignedNodes();
      var swiperOptions = {
        height: this.height,
        width: this.width,
        virtualTranslate: this.virtualTranslate,
        roundLengths: this.roundLengths,
        originalEvent: this.originalEvent,
        autoplay: this.autoplay,
        direction: this.direction,
        initialSlide: this.initialSlide,
        loop: this.loop,
        pager: this.pager,
        paginationType: this.paginationType,
        parallax: this.parallax,
        slidesPerView: this.slidesPerView,
        spaceBetween: this.spaceBetween,
        speed: this.speed,
        zoom: this.zoom,
        slidesPerColumn: 1,
        slidesPerColumnFill: 'column',
        slidesPerGroup: 1,
        centeredSlides: false,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        touchEventsTarget: 'container',
        autoplayDisableOnInteraction: true,
        autoplayStopOnLast: false,
        freeMode: false,
        freeModeMomentum: true,
        freeModeMomentumRatio: 1,
        freeModeMomentumBounce: true,
        freeModeMomentumBounceRatio: 1,
        freeModeMomentumVelocityRatio: 1,
        freeModeSticky: false,
        freeModeMinimumVelocity: 0.02,
        autoHeight: false,
        setWrapperSize: false,
        zoomMax: 3,
        zoomMin: 1,
        zoomToggle: true,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: true,
        shortSwipes: true,
        longSwipes: true,
        longSwipesRatio: 0.5,
        longSwipesMs: 300,
        followFinger: true,
        onlyExternal: false,
        threshold: 0,
        touchMoveStopPropagation: true,
        touchReleaseOnEdges: false,
        iOSEdgeSwipeDetection: false,
        iOSEdgeSwipeThreshold: 20,
        paginationClickable: false,
        paginationHide: false,
        resistance: true,
        resistanceRatio: 0.85,
        watchSlidesProgress: false,
        watchSlidesVisibility: false,
        preventClicks: true,
        preventClicksPropagation: true,
        slideToClickedSlide: false,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        swipeHandler: null,
        noSwiping: true,
        runCallbacksOnInit: true,
        controlBy: 'slide',
        controlInverse: false,
        keyboardControl: true,
        coverflow: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        },
        flip: {
          slideShadows: true,
          limitRotation: true
        },
        cube: {
          slideShadows: true,
          shadow: true,
          shadowOffset: 20,
          shadowScale: 0.94
        },
        fade: {
          crossFade: false
        },
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
        firstSlideMessage: 'This is the first slide',
        lastSlideMessage: 'This is the last slide',
        onSlideChangeStart: this.emitEvent('ionSlideWillChange'),
        onSlideChangeEnd: this.emitEvent('ionSlideDidChange'),
        onAutoplay: this.emitEvent('ionSlideAutoplay'),
        onAutoplayStart: this.emitEvent('ionSlideAutoplayStart'),
        onAutoplayStop: this.emitEvent('ionSlideAutoplayStop'),
        onSlideNextStart: this.emitEvent('ionSlideNextStarto'),
        onSlidePrevStart: this.emitEvent('ionSlidePrevStart'),
        onSlideNextEnd: this.emitEvent('ionSlideNextEnd'),
        onSlidePrevEnd: this.emitEvent('ionSlidePrevEnd'),
        onTransitionStart: this.emitEvent('ionSlideTransitionStart'),
        onTransitionEnd: this.emitEvent('ionSlideTransitionEnd'),
        onTap: this.emitEvent('ionSlideTap'),
        onDoubleTap: this.emitEvent('ionSlideDoubleTap'),
        onProgress: this.emitEvent('ionSlideProgress'),
        onSliderMove: this.emitEvent('ionSlideDrag'),
        onReachBeginning: this.emitEvent('ionSlideReachStart'),
        onReachEnd: this.emitEvent('ionSlideReachEnd'),
        onTouchStart: this.emitEvent('ionSlideTouchStart'),
        onTouchEnd: this.emitEvent('ionSlideTouchEnd')
      };

      // init swiper core
      this.swiper = new Swiper(this.container, swiperOptions);


      if (this.keyboardControl) {
        // init keyboard event listeners
        this.enableKeyboardControl(true);
      }

      this._init = true;
    }
  }

  /**
   * @hidden
   */
  ionViewDidLoad() {
    this._initSlides();
  }

  /**
   * Update the underlying slider implementation. Call this if you've added or removed
   * child slides.
   */
  update(debounce = 300) {
    if (this._init) {
      window.clearTimeout(this._tmr);
      this._tmr = window.setTimeout(() => {
        this.swiper.update();

        // Don't allow pager to show with > 10 slides
        if (this.length() > 10) {
          this.paginationType = undefined;
        }
      }, debounce);
    }
  }

  /**
   * Transition to the specified slide.
   *
   * @param {number} index  The index number of the slide.
   * @param {number} [speed]  Transition duration (in ms).
   * @param {boolean} [runCallbacks] Whether or not to emit the `ionSlideWillChange`/`ionSlideDidChange` events. Default true.
   */
  slideTo(index: number, speed?: number, runCallbacks?: boolean) {
    this.swiper.slideTo(index, speed, runCallbacks);
  }

  /**
   * Transition to the next slide.
   *
   * @param {number} [speed]  Transition duration (in ms).
   * @param {boolean} [runCallbacks]  Whether or not to emit the `ionSlideWillChange`/`ionSlideDidChange` events. Default true.
   */
  slideNext(speed?: number, runCallbacks?: boolean) {
    this.swiper.slideNext(runCallbacks, speed);
  }

  /**
   * Transition to the previous slide.
   *
   * @param {number} [speed]  Transition duration (in ms).
   * @param {boolean} [runCallbacks]  Whether or not to emit the `ionSlideWillChange`/`ionSlideDidChange` events. Default true.
   */
  slidePrev(speed?: number, runCallbacks?: boolean) {
    this.swiper.slidePrev(runCallbacks, speed);
  }

  /**
   * Get the index of the active slide.
   *
   * @returns {number} The index number of the current slide.
   */
  getActiveIndex(): number {
    return this.swiper.activeIndex;
  }

  /**
   * Get the index of the previous slide.
   *
   * @returns {number} The index number of the previous slide.
   */
  getPreviousIndex(): number {
    return this.swiper.previousIndex;
  }

  /**
   * Get the total number of slides.
   *
   * @returns {number} The total number of slides.
   */
  length(): number {
    return this.swiper.slides.length;
  }

  /**
   * Get whether or not the current slide is the last slide.
   *
   * @returns {boolean} If the slide is the last slide or not.
   */
  isEnd(): boolean {
    return this.isEnd();
  }

  /**
   * Get whether or not the current slide is the first slide.
   *
   * @returns {boolean} If the slide is the first slide or not.
   */
  isBeginning(): boolean {
    return this.isBeginning();
  }

  /**
   * Start auto play.
   */
  startAutoplay() {
    this.swiper.startAutoplay();
  }

  /**
   * Stop auto play.
   */
  stopAutoplay() {
    this.swiper.stopAutoplay();
  }

  /**
   * Lock or unlock the ability to slide to the next slides.
   */
  lockSwipeToNext(shouldLockSwipeToNext: boolean) {
    if (shouldLockSwipeToNext) {
      return this.swiper.lockSwipeToNext();
    }
    this.swiper.unlockSwipeToNext();
  }

  /**
   * Lock or unlock the ability to slide to the previous slides.
   */
  lockSwipeToPrev(shouldLockSwipeToPrev: boolean) {
    if (shouldLockSwipeToPrev) {
      return this.swiper.lockSwipeToPrev();
    }
    this.swiper.unlockSwipeToPrev();
  }

  /**
   * Lock or unlock the ability to slide to change slides.
   */
  lockSwipes(shouldLockSwipes: boolean) {
    if (shouldLockSwipes) {
      return this.swiper.lockSwipes();
    }
    this.swiper.unlockSwipes();
  }

  /**
   * Enable or disable keyboard control.
   */
  enableKeyboardControl(shouldEnableKeyboard: boolean) {
    if (shouldEnableKeyboard) {
      return this.swiper.enableKeyboardControl();
    }
    this.swiper.disableKeyboardControl();
  }

  /**
   * @hidden
   */
  ngOnDestroy() {
    this._init = false;

    this.swiper.destroy(true, true);
    this.enableKeyboardControl(false);
  }
}

let slidesId = -1;
