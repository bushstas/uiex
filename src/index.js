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

const map = {
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
};

export const setDefaultPropsFor = (component, props) => {
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

export const setDefaultStyleFor = (component, style,  name = 'main') => {
    if (style instanceof Object) {
        if (typeof component == 'string') {
            if (typeof map[component] == 'function') {
                if (typeof map[component].setDefaultStyle == 'function') {
                    map[component].setDefaultStyle(style);
                } else {
                    map[component].defaultStyles = map[component].defaultStyles || {}; 
                    map[component].defaultStyles[name] = style;
                }
            } else {
                return console.error('Error in setDefaultStyle: Component "' + component + '" is not found');
            }
        } else {
            return console.error('Error in setDefaultStyle: The first argument should be a string (the name of a component)');
        }
    } else {
        return console.error('Error in setDefaultStyle: The second argument should be an object');
    }
}