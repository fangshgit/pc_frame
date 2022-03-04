/**
 * @description element配置
 */
import Vue from 'vue'
import '../styles/element-variables.scss'
import 'element-ui/lib/theme-chalk/display.css'
import ElementLocale from 'element-ui/lib/locale'

// 完整的引入了el的组件，不需要对应组件可删除对应的引入
import {
	Pagination,
	Dialog,
	Autocomplete,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Menu,
	Submenu,
	MenuItem,
	MenuItemGroup,
	Input,
	InputNumber,
	Radio,
	RadioGroup,
	RadioButton,
	Checkbox,
	CheckboxButton,
	CheckboxGroup,
	Switch,
	Select,
	Option,
	OptionGroup,
	Button,
	ButtonGroup,
	Table,
	TableColumn,
	DatePicker,
	TimeSelect,
	TimePicker,
	Popover,
	Tooltip,
	Breadcrumb,
	BreadcrumbItem,
	Form,
	FormItem,
	Tabs,
	TabPane,
	Tag,
	Tree,
	Alert,
	Slider,
	Icon,
	Row,
	Col,
	Upload,
	Progress,
	Spinner,
	Badge,
	Card,
	Rate,
	Steps,
	Step,
	Carousel,
	CarouselItem,
	Collapse,
	CollapseItem,
	Cascader,
	ColorPicker,
	Transfer,
	Container,
	Header,
	Aside,
	Main,
	Footer,
	Timeline,
	TimelineItem,
	Link,
	Divider,
	Image,
	Calendar,
	Backtop,
	PageHeader,
	CascaderPanel,
	Loading,
} from 'element-ui'
let elUi = [
	Pagination,
	Dialog,
	Autocomplete,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Menu,
	Submenu,
	MenuItem,
	MenuItemGroup,
	Input,
	InputNumber,
	Radio,
	RadioGroup,
	RadioButton,
	Checkbox,
	CheckboxButton,
	CheckboxGroup,
	Switch,
	Select,
	Option,
	OptionGroup,
	Button,
	ButtonGroup,
	Table,
	TableColumn,
	DatePicker,
	TimeSelect,
	TimePicker,
	Popover,
	Tooltip,
	Breadcrumb,
	BreadcrumbItem,
	Form,
	FormItem,
	Tabs,
	TabPane,
	Tag,
	Tree,
	Alert,
	Slider,
	Icon,
	Row,
	Col,
	Upload,
	Progress,
	Spinner,
	Badge,
	Card,
	Rate,
	Steps,
	Step,
	Carousel,
	CarouselItem,
	Collapse,
	CollapseItem,
	Cascader,
	ColorPicker,
	Transfer,
	Container,
	Header,
	Aside,
	Main,
	Footer,
	Timeline,
	TimelineItem,
	Link,
	Divider,
	Image,
	Calendar,
	Backtop,
	PageHeader,
	CascaderPanel,
	Loading.directive
]
elUi.forEach(item => {
	Vue.use(item)
})
// el的全局配置对象
Vue.prototype.$ELEMENT = { size: 'small' }
// 若不需要i18n，则注释以下代码

// import i18n from '@/i18n'
// ElementLocale.i18n((key, value) => i18n.t(key, value))
