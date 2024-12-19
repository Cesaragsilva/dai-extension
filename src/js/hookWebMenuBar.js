// import { cloneElement } from 'react';


const DAI_SVG = '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="24px" height="24px" viewBox="0 0 32.00 32.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"><path d="M12.8612 27.943C12.8281 28.4061 13.1949 28.8 13.6592 28.8H18.3408C18.8051 28.8 19.1719 28.4061 19.1388 27.943L18.4 17.6H13.6L12.8612 27.943Z" fill="url(#paint0_linear_103_1792)"/><path d="M28.8 0H3.2C1.43269 0 0 1.43269 0 3.2V19.2C0 20.9673 1.43269 22.4 3.2 22.4H28.8C30.5673 22.4 32 20.9673 32 19.2V3.2C32 1.43269 30.5673 0 28.8 0Z" fill="url(#paint1_radial_103_1792)"/><path d="M0 20.8C0 22.5673 1.43269 24 3.2 24H28.8C30.5674 24 32 22.5673 32 20.8V17.6H0V20.8Z" fill="#D8D8D8"/><path d="M17.6 20.8C17.6 19.9163 16.8837 19.2 16 19.2C15.1163 19.2 14.4 19.9163 14.4 20.8C14.4 21.6837 15.1163 22.4 16 22.4C16.8837 22.4 17.6 21.6837 17.6 20.8Z" fill="#2B2B2B"/><defs><linearGradient id="paint0_linear_103_1792" x1="16" y1="16.1707" x2="16" y2="28.8" gradientUnits="userSpaceOnUse"><stop stop-color="#B8B8B8"/><stop offset="1" stop-color="#C7C7C7"/></linearGradient><radialGradient id="paint1_radial_103_1792" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1.0941 28.8) rotate(137.02) scale(42.2447 63.3453)"><stop/><stop offset="1" stop-color="#757575"/></radialGradient></defs></g></svg>';
const get_svg_by_id = (id) => {
    return id.length > 22 ? ANDROID_SVG : id.substring(0, 2) === '3A' ? APPLE_SVG : DESKTOP_SVG;
};

class HookWebMenuBar extends Hook {
    constructor() {
        super();
        this.original_function = null;
    }


    register() {
        if (this.is_registered) {
            return;
        }
        super.register();
        this.original_function = MODULES.WEB_MENU_BAR.MenuBar;
        const original_function = this.original_function;
        MODULES.WEB_MENU_BAR.MenuBar = function () {
            const ret = original_function(...arguments);
            if (arguments.length==2 && arguments[0].theme=='nav-bar'){
                //TODO Implementar icone da DAI no menu do Whatsapp Web.
                // const daiElement = cloneElement(arguments[0].children.props.children.props.children[0].props.children[4],
                // {});
                // arguments[0].children.props.children.props.children[0].props.children.appendChild(daiElement);
            }
            return ret;
        };
    }

    unregister() {
        if (!this.is_registered) {
            return;
        }
        super.unregister();
        MODULES.WEB_MENU_BAR.MenuBar = this.original_function;
    }

    static set_menu_DAI() {
        // const message_elements = document.querySelectorAll(`[data-id="${message.id._serialized}"]`);
        // if (message_elements.length !== 1) {
        //     return;
        // }
        // const message_parts = Array.from(message_elements[0].childNodes[0].childNodes);
        // const message_box = message_parts.find((element) => element.innerText.includes(':'));
        // if (message_box?.childNodes?.length < 2) {
        //     return;
        // }
        // const insert_into = message_box.childNodes[message_box.childNodes.length - 1];
        // if (Array.from(insert_into.childNodes).some((element) => element.tagName === 'SVG')) {
        //     return;
        // }
        // const div_svg = document.createElement('svg');
        // div_svg.innerHTML = get_svg_by_id(message.id.id);
        // insert_into.prepend(div_svg);
    }
}
