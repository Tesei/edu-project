import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import component from './MyButton.vue'

describe('Button component', () => {
    const buildWrapper = (hasAllData) => {
        const propsData = {
            hasAllData,
        }
        return mount(component, {
            propsData,
        })
    }
    it('mounts without error', () => {
        const wrapper = buildWrapper()
        expect(wrapper.exists).toBeTruthy()
        expect(wrapper.html()).toMatchSnapshot()
    })
    it('don have data - disabled button', () => {
        const wrapper = buildWrapper(false)
        expect(wrapper.find('button').attributes().disabled).toBe('')
    })
    it('if we have all data button - active', () => {
        const wrapper = buildWrapper(true)
        expect(wrapper.find('button').attributes().class).includes('_active')
    })
    it('button has attribute submit', () => {
        const wrapper = buildWrapper(true)
        expect(wrapper.find('button').attributes().type).includes('submit')
    })
})
