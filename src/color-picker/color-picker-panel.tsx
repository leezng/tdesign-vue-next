import { defineComponent, provide, ref, toRefs } from 'vue';
import useVModel from '../hooks/useVModel';
import props from './props';
import ColorPanel from './panel';
import { TdColorPickerPopupProvide, TdColorPickerProvides, TdColorContext } from './interfaces';
import { usePrefixClass } from '..';

export default defineComponent({
  name: 'TColorPickerPanel',
  components: {
    ColorPanel,
  },
  inheritAttrs: false,
  props,
  setup(props) {
    const prefix = usePrefixClass();
    provide<TdColorPickerPopupProvide>(TdColorPickerProvides.POPUP, {
      visible: ref(false),
      setVisible() {},
    });

    const { value, modelValue } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    const handleChange = (value: string, context: TdColorContext) => {
      setInnerValue(value, context);
    };

    const handlePaletteChange = (context: TdColorContext) => {
      props.onPaletteBarChange(context);
    };

    return {
      innerValue,
      prefix,
      handleChange,
      handlePaletteChange,
    };
  },
  render() {
    const { prefix } = this;
    return <color-panel {...this.$props} popupProps={null} close-btn={false} custom-class={`${prefix}-is-inline`} />;
  },
});
