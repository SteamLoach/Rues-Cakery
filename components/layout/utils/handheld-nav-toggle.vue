<template>
  <button 
    class="handheld-nav-toggle"
    @click="toggle">
    <div 
      class="icon"
      :class="{'is-active': isActive}"
      aria-hidden="true">
    </div>
  </button>
</template>

<script>

import {mapMutations, mapGetters} from 'vuex'
import {
  ModuleNames,
  NavigationGetterNames,
  NavigationMutationNames
} from '@/constants/store'

export default {
  
  computed: {
    ...mapGetters(ModuleNames.Navigation, {
      isActive: NavigationGetterNames.HandheldNavIsActive
    })
  },

  methods: {
    ...mapMutations(ModuleNames.Navigation, {
      toggle: NavigationMutationNames.ToggleHandheldNavIsActive
    })
  }

}
</script>

<style lang="scss" scoped>

%burger-bar {
  height: 4px;
  width: 45px;
  background-color: $text-color;
  border-radius: 20px;
  transition-property: background-color, transform;
  transition-duration: $transition-duration;
  transition-timing-function: ease;
}

.handheld-nav-toggle {
  @include hidden-from($tablet);
  text-align: left;
  z-index: 1;
  overflow: visible;
  padding: 0px 4px 20px 4px;
  &:hover {
    cursor: pointer;
  }

  .icon {
    @extend %burger-bar;
    position: relative;
    &:before, &:after {
      @extend %burger-bar;
      display: inline-block;
      content: "";
      position: absolute;
      transition-delay: inherit;
    }
    &:before {
      top: 10px
    }
    &:after {
      top: 20px
    }
  }

  .icon {
    &.is-active {
    transform: translate(0px, 10px) rotate(-135deg);
      &:before {
        transform: scale(0) translate(0px, -8px) rotate(-270deg);
      }
      &:after {
        transform: translate(0px, -20px) rotate(270deg);
      }
    }
  }

}
/*
.handheld-nav-toggle--name {
  position: relative;
    top: 22px;
  text-align: center;
  font-size: $text-body;
  font-weight: 600;
}
*/



</style>