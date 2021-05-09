const FORM_ELEMENT_DIV_CLASS = "new_form_elements";
const FORM_ELEMENT_DIV_ID = "form_element";
const DIV_INSTANCE_ATTRIBUTE = "instance";
const DIV_IDB_ATTRIBUTE = "idb_id";

const ONE_ATTRIBUTE_TO_RULE_THEM_ALL = "the_one";
const LABEL_ATTRIBUTE = "label";
const TYPE_ATTRIBUTE = "type";
const VALIDATION_ATTRIBUTE = "validation";

const INPUT_NAME = "form_element_type";
const INPUT_ID = "label_name";
const INPUT_LABEL = "Element";
const INPUT_VALUE = "New label";
const INPUT_ATTRIBUTES = {};
INPUT_ATTRIBUTES[ONE_ATTRIBUTE_TO_RULE_THEM_ALL] = LABEL_ATTRIBUTE;

const TEXTBOX_OPTION = "textbox";
const CHECKBOX_OPTION = "checkbox";
const RADIOBUTTON_OPTION = "radiobutton";
const FET_SELECTBOX_NAME = "form_element_type";
const FET_SELECTBOX_ID = "element_type";
const FET_SELECTBOX_OPTIONS = {};
FET_SELECTBOX_OPTIONS[TEXTBOX_OPTION] = "TextBox";
FET_SELECTBOX_OPTIONS[CHECKBOX_OPTION] = "CheckBox";
FET_SELECTBOX_OPTIONS[RADIOBUTTON_OPTION] = "RadioButton";
const FET_SELECTBOX_ATTRIBUTES = {};
FET_SELECTBOX_ATTRIBUTES[ONE_ATTRIBUTE_TO_RULE_THEM_ALL] = TYPE_ATTRIBUTE;

const NONE_OPTION = "none";
const MANDATORY_OPTION = "mandatory";
const NUMERIC_OPTION = "numeric";
const FVT_SELECTBOX_NAME = "form_validation_type";
const FVT_SELECTBOX_ID = "validation_type";
const FVT_SELECTBOX_OPTIONS = {};
FVT_SELECTBOX_OPTIONS[NONE_OPTION] = "None";
FVT_SELECTBOX_OPTIONS[MANDATORY_OPTION] = "Mandatory";
FVT_SELECTBOX_OPTIONS[NUMERIC_OPTION] = "Numeric";
const FVT_SELECTBOX_ATTRIBUTES = {};
FVT_SELECTBOX_ATTRIBUTES[ONE_ATTRIBUTE_TO_RULE_THEM_ALL] = VALIDATION_ATTRIBUTE;

const RADIOBUTTON_NUMBER_INPUT_NAME = "form_number_options";
const RADIOBUTTON_NUMBER_INPUT_ID = "number_option";
const RADIOBUTTON_OPTION_INPUT_NAME = "form_radiobutton_option";
const RADIOBUTTON_OPTION_INPUT_ID = "radiobutton_option";
const RADIOBUTTON_OPTION_LABEL = "Option";
const RADIOBUTTON_OPTION_DIV_CLASS = "form_radiobutton_options";
const RADIOBUTTON_OPTION_DIV_ID = "radiobutton_option";
const RADIOBUTTON_INPUT_ATTRIBUTES = {};
RADIOBUTTON_INPUT_ATTRIBUTES[ONE_ATTRIBUTE_TO_RULE_THEM_ALL] = RADIOBUTTON_OPTION;

const BUTTON_ID = "add_form_element";
const BUTTON_TEXT = "Add";

const RADIOBUTTON_MIN_VALUE = 2;
const RADIOBUTTON_NUMBER_ATTRIBUTES = {"min":RADIOBUTTON_MIN_VALUE};

const DB_NAME = "online_forms";
const VERSION = 1;

const FORMS_TABLE = "forms";
const FORMS_TABLE_KEY = "name";

const ELEMENTS_TABLE = "elements";
const ELEMENTS_TABLE_INDEX = 'form_name';
const ELEMENTS_TABLE_KEY = "id";

const ELEMENT_OPTIONS_TABLE = "element_options";
const ELEMENT_OPTIONS_TABLE_KEY = "id";
const ELEMENT_OPTIONS_TABLE_INDEX = "element_id";

const F_FORMS_TABLE = "f_forms";
const F_FORMS_TABLE_KEY = "id";
const F_FORMS_TABLE_VERSION = "version";
const F_FORMS_TABLE_C_INDEX = "idb_id_version";