import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import component from './MyCheckbox.vue'

describe('MyCheckbox component', () => {
    const buildWrapper = (slotText = 'Main Content', error = false) => {
        const propsData = {
            error,
        }
        return mount(component, {
            slots: {
                default: slotText,
            },
            propsData,
        })
    }
    it('mounts without error', () => {
        const wrapper = buildWrapper()
        expect(wrapper.exists).toBeTruthy()
        // expect(wrapper.html()).toMatchSnapshot()
    })
    it('slot set html', () => {
        const wrapper = buildWrapper('<div>Main Content</div>')
        expect(wrapper.find('label').html()).toContain('<div>Main Content</div>')
    })
    it('slot set text', () => {
        const wrapper = buildWrapper('Main Content')
        expect(wrapper.find('label').text()).toContain('Main Content')
    })
    it('if checkbox has props error', () => {
        const wrapper = buildWrapper('', true)
        expect(wrapper.find('label').attributes().class).includes('_red')
    })

    it('should update isChecked when checkbox is checked', async () => {
        const wrapper = buildWrapper('', true)
        const checkbox = wrapper.find('input[type="checkbox"]')

        await checkbox.setChecked()

        expect(wrapper.vm.isChecked).toBe(true)
    })
    it('should update isChecked when checkbox is unchecked', async () => {
        const wrapper = buildWrapper()
        const checkbox = wrapper.find('input[type="checkbox"]')

        await checkbox.setChecked()
        await checkbox.setChecked(false)

        expect(wrapper.vm.isChecked).toBe(false)
    })
})
