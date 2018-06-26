import {AutoComplete} from './components/AutoComplete';
import {Box} from './components/Box';
import {BoxSection} from './components/BoxSection';
import {Button} from './components/Button';
import {ButtonGroup} from './components/ButtonGroup';
import {Checkbox} from './components/Checkbox';
import {CheckboxGroup} from './components/CheckboxGroup';
import {Form} from './components/Form';
import {FormControl} from './components/FormControl';
import {FormControlGroup} from './components/FormControlGroup';
import {Icon} from './components/Icon';
import {Input} from './components/Input';
import {InputBoolean} from './components/InputBoolean';
import {InputDate} from './components/InputDate';
import {InputNumber} from './components/InputNumber';
import {InputPhone} from './components/InputPhone';
import {Label} from './components/Label';
import {LabelGroup} from './components/LabelGroup';
import {MultiSelect} from './components/MultiSelect';
import {Popup} from './components/Popup';
import {PopupMenu, PopupMenuItem} from './components/PopupMenu';
import {Radio} from './components/Radio';
import {RadioGroup} from './components/RadioGroup';
import {SearchForm} from './components/SearchForm';
import {Section} from './components/Section';
import {Select, SelectOption} from './components/Select';
import {Tab} from './components/Tab';
import {Tabs} from './components/Tabs';
import * as UIEXCONSTS from './components/consts';


import './style.scss';

export {
    UIEXCONSTS,
    AutoComplete,
	Box,
    BoxSection,
    Button,
    ButtonGroup,
    Checkbox,
    CheckboxGroup,
    Form,
    FormControl,
    FormControlGroup,
    Icon,
    Input,
    InputBoolean,
    InputDate,
    InputNumber,
    InputPhone,
    Label,
    LabelGroup,
    MultiSelect,
    Popup,
    PopupMenu,
    PopupMenuItem,
    Radio,
    RadioGroup,
    SearchForm,
    Section,
    Select,
    SelectOption,
    Tab,
    Tabs
}

const map = exports;

export const setDefaultProps = (component, props) => {
    if (props instanceof Object) {
        if (typeof component == 'string') {
            if (typeof map[component] == 'function') {
                if (map[component].defaultProps) {
                    map[component].defaultProps = {
                        ...map[component].defaultProps,
                        ...props
                    }
                } else {
                    map[component].defaultProps = props;
                }
            } else {
                return console.error('Error in setDefaultProps: Component "' + component + '" is not found');
            }
        } else {
            return console.error('Error in setDefaultProps: The first argument should be a string (the name of a component)');
        }
    } else {
        return console.error('Error in setDefaultProps: The second argument should be an object');
    }
}

export const setDefaultStyle = (component, style) => {
   addDefaultStyle(component, style, 'main', '');
}

export const setDefaultStyles = (component, styles) => {
   if (styles instanceof Object) {
        for (let k in styles) {
            addDefaultStyle(component, styles[k], k, 's');
        }
    } else {
        console.error('Error in setDefaultStyles: The second argument should be an object');
    }
}

const addDefaultStyle = (component, style, name, s) => {
    s = 'setDefaultStyle' + s;
    if (style instanceof Object) {
        if (typeof component == 'string') {
            if (typeof map[component] == 'function') {
                if (name != 'main') {
                    const styleNames = map[component].styleNames;
                    if (!(styleNames instanceof Array) || styleNames.indexOf(name) == -1) {
                        console.error('Error in ' + s + ': Element "' + name + '" does not exist in the component "' + component + '"');
                        return;
                    }
                }
                map[component].defaultStyles = map[component].defaultStyles || {}; 
                map[component].defaultStyles[name] = style;
            } else {
                console.error('Error in ' + s + ': Component "' + component + '" is not found');
            }
        } else {
            console.error('Error in ' + s + ': The first argument should be a string (the name of a component)');
        }
    } else {
        console.error('Error in ' + s + ': The second argument should be an object');
    }
}

export const addClassStyle = (component, className, style) => {
    addClass(component, className, style, 'main');
}

export const addClassStyles = (component, className, styles) => {
    if (styles instanceof Object) {
        for (let k in styles) {
            addClass(component, className, styles[k], k, 's');
        }
    } else {
        console.error('Error in addClassStyles: The third argument should be an object');
    }
}

const addClass = (component, className, style, name, s) => {
    s = 'addClassStyle' + s;
    if (style instanceof Object) {
        if (typeof component == 'string') {
            if (typeof map[component] == 'function') {
                if (name != 'main') {
                    const styleNames = map[component].styleNames;
                    if (!(styleNames instanceof Array) || styleNames.indexOf(name) == -1) {
                        console.error('Error in ' + s + ': Element "' + name + '" does not exist in the component "' + component + '"');
                        return;
                    }
                }
                map[component].classStyles = map[component].classStyles || {}; 
                map[component].classStyles[className] = map[component].classStyles[className] || {};
                map[component].classStyles[className][name] = style;
                console.log(map[component].classStyles)
            } else {
                console.error('Error in ' + s + ': Component "' + component + '" is not found');
            }
        } else {
            console.error('Error in ' + s + ': The first argument should be a string (the name of a component)');
        }
    } else {
        console.error('Error in ' + s + ': The second argument should be an object');
    }
}