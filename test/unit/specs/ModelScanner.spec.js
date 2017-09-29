import Vue from 'vue';
import ModelScanner from '@/components/ModelScanner';

describe('ModelScanner.vue', () => {
    it('should render correct attributes', () => {
        const Constructor = Vue.extend(ModelScanner);
        const vm = new Constructor().$mount();
        expect(vm.$el.querySelector('.el-input input').getAttribute('placeholder'))
            .to.equal('Product model');

        expect(vm.$el.querySelector('.el-input input').getAttribute('icon'))
            .to.equal('fa-barcode');

        expect(vm.$el.querySelector('.el-input input').getAttribute('autofocus'))
            .to.equal('autofocus');
    });
});
