import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import component from './MyInput.vue'

describe.each([{ oninpShow: true }, { oninpShow: false }])('MyInput component', ({ oninpShow }) => {
    const buildWrapper = (slotText = 'Окно ввода', disabled = false) => {
        const propsData = {
            dataError: 'Danger',
            req: true,
            disabled,
            placeholder: 'Введите текст',
            oninpShow: oninpShow,
        }
        return mount(component, {
            propsData,
            slots: {
                default: slotText,
            },
        })
    }
    it('mounts without error, если oninpShow = ' + oninpShow, () => {
        const wrapper = buildWrapper()
        expect(wrapper.exists).toBeTruthy()
    })
    it('slot set html, если oninpShow = ' + oninpShow, () => {
        const wrapper = buildWrapper('<div>Main Content</div>')
        expect(wrapper.find('label').html()).toContain('<div>Main Content</div>')
    })
    it('slot set text, если oninpShow = ' + oninpShow, () => {
        const wrapper = buildWrapper()
        expect(wrapper.find('label').text()).toContain('Окно ввода')
    })
    it('check error class, если oninpShow = ' + oninpShow, () => {
        const wrapper = buildWrapper()
        expect(wrapper.find('input').attributes().class).includes('_error')
    })
    it('check req class, если oninpShow = ' + oninpShow, () => {
        const wrapper = buildWrapper()
        expect(wrapper.find('input').attributes().class).includes('_req')
    })
    it('check _active class, если oninpShow = ' + oninpShow, async () => {
        const wrapper = buildWrapper()
        const input = wrapper.find('input')
        await input.setValue('hello!')
        expect(input.attributes().class).includes('_active')
    })
    it('check v-modal event, если oninpShow = ' + oninpShow, async () => {
        const wrapper = buildWrapper()
        const input = wrapper.find('input')
        await input.setValue('hello!')        
        expect(wrapper.emitted()['update:modelValue'][0]).includes('hello!')
    })
    it('check disabled props, если oninpShow = ' + oninpShow, () => {
        const wrapper = buildWrapper('', true)
        expect(wrapper.find('input').attributes().disabled).toBe('')
    })
})
