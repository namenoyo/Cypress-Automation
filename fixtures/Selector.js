// Selector.js
// รวม Selector และข้อมูลเมนูที่ใช้ในเทสต์ทั้งหมด

module.exports = {
  usernameInput: '#username',
  passwordInput: '#password',
  loginButton: 'button[name="loginButton"]',
  body: 'body',
  // เพิ่ม selector อื่นๆ ตามที่ใช้ในไฟล์ TS_EMAILNOTI
  
  
  // ตัวอย่าง selector ที่ใช้กับ cy.get('input#' + monthInputId) และ yearInputId
  monthInput: (id) => `input#${id}`,
  yearInput: (id) => `input#${id}`,
  
  
  // ตัวอย่าง selector ที่ใช้กับ cy.get('span.' + spanClassBtn)
  spanClass: (className) => `span.${className}`,
  
  
  // Selector สำหรับปุ่มและ element ที่ใช้บ่อย (จากทั้งสองไฟล์)
  BTN_CLEAR: "span.MuiButton-label:contains('ล้างเงื่อนไข')",
  BTN_SEARCH: "span.MuiButton-label:contains('ค้นหา')",
  BTN_SEARCH_FORM: "[id='tab/inquiry/search/main'] > div > div > div:nth-child(2) > div > div.MuiCollapse-container.MuiCollapse-entered > div > div > div > div > form > div > div > div > div > div > div > div > div > div.MuiGrid-root.OLIColumnLayout-basicActionComponent-487.basicActionComponent.MuiGrid-item.MuiGrid-grid-xs-auto.MuiGrid-grid-sm-12 > div > div:nth-child(2) > button > span.MuiButton-label",
  TOOLBAR_RESULT: "span.Toolbar-Message-text, span.Toolbar-Message-value",
  DETAIL_TEXT: "div,table",
  DETAIL_FIELDS: [
    { selector: "label:contains('รายละเอียด') + div, label:contains('Detail') + div", label: 'รายละเอียด' },
    { selector: "input[name='detail'], textarea[name='detail']", label: 'ช่องรายละเอียด' }
  ],
  
  // เพิ่มจาก Reuseable/Selector.js
  policyNoInput: 'input[name="policyNo"], input[id*="policy"], input[aria-label*="เลขที่กรมธรรม์"]',
  insuredFirstNameInput: 'input[name*="firstName"], input[id*="firstName"], input[aria-label*="ชื่อ"]',
  insuredLastNameInput: 'input[name*="lastName"], input[id*="lastName"], input[aria-label*="นามสกุล"]',
  cardNoInput: 'input[name*="card"], input[id*="card"], input[aria-label*="บัตร"]',
  
  // เมนูหลัก
  SERVICE_MENU: {
    label: 'ระบบงานให้บริการ',
    href: '#menu-item-3000',
    class: 'yui3-menu-label yui3-menu-label-active',
  },
  EMAIL_NOTIFICATION_MENU: {
    label: 'ระบบ Email Notification',
  },
  EMN_SUB_MENU_1: {
    label: 'ระบบออกจดหมาย',
    spanClass: 'MuiButton-label',
    selector: '#root > div > div > div.MuiToolbar-root.MuiToolbar-regular.AppLayout-toolbarPrimaryNav-31 > div > div:nth-child(2) > span:nth-child(1) > button'
  },
  EMN_SUB_MENU_1_1: {
    label: 'รายงานสรุปการออกจดหมาย',
  },
  EMN_SUB_MENU_1_1_BTN_1: {
    label: 'ค้นหา',
    spanClass: 'MuiButton-label',
  },
  EMN_SUB_MENU_1_1_LIST_1: {
    label: 'เดือน',
    inputId: 'letterMM',
    placeholderClass: 'css-jb3yj5-placeholder',
    wrapperClass: 'css-tntsk8',
  },
  EMN_SUB_MENU_1_1_LIST_2: {
    label: 'ปี พ.ศ.',
    inputId: 'letterYYYY',
    placeholderClass: 'css-jb3yj5-placeholder',
    wrapperClass: 'css-tntsk8',
  },
  // --- NBS Portal  ---
  NBS_PORTAL_MENU_Navigate_1: {
    label: 'ระบบงาน NBS Portal',
    href: '#menu-item-98000',
  },
  HHOME_SUB_MENU_Navigate_2: {
    label: 'Home',
    href: '/nbsweb/secure/msa/nbsportal/index.html',
    role: 'menuitem',
  },

  // --- Automatic Alteration  ---
  SELECTOR_ALTERNATION_MENU: {
    label: 'ระบบงานสำหรับรับเรื่องและพิจารณาสลักหลังกรมธรรม์',
    href: '/thaisamut/web/alter/index.html',
  },
  SELECTOR_ALTERNATION_MENU_SUB_1: {
    label: 'ค้นหาใบสอบถาม',
    selector: '<span class="MuiButton-label">ค้นหาใบสอบถาม</span>',
  },
  SELECTOR_Automatic_Alteration_SEARCH_1:  'input[name="inquiryDateFrom"][placeholder="เริ่มต้น"][type="text"].MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedEnd',
  SELECTOR_Automatic_Alteration_SEARCH_2:  'input[name="inquiryDateTo"][placeholder="สิ้นสุด"][type="text"].MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedEnd',
  SELECTOR_Automatic_Alteration_SEARCH_3:  'input[type="text"].MuiInputBase-input.MuiInput-input[value^="__-"]',
  SELECTOR_Automatic_Alteration_SEARCH_4:  '#branchSourceCode > div > div > div > div',
  SELECTOR_Automatic_Alteration_SEARCH_5:  '#serviceCode > div > div > div > div',
  SELECTOR_Automatic_Alteration_SEARCH_6:  '#inquiryStatus > div > div > div > div',
  SELECTOR_Automatic_Alteration_SEARCH_7:  '#tab\\/inquiry\\/search\\/main > div > div > div:nth-child(2) > div > div.MuiCollapse-container.MuiCollapse-entered > div > div > div > div > form > div > div > div > div > div > div > div > div > div:nth-child(9) > div > div > input',
  SELECTOR_Automatic_Alteration_SEARCH_8:  '#tab\\/inquiry\\/search\\/main > div > div > div:nth-child(2) > div > div.MuiCollapse-container.MuiCollapse-entered > div > div > div > div > form > div > div > div > div > div > div > div > div > div:nth-child(10) > div > div > input',
  SELECTOR_Automatic_Alteration_SEARCH_9:  '#tab\\/inquiry\\/search\\/main > div > div > div:nth-child(2) > div > div.MuiCollapse-container.MuiCollapse-entered > div > div > div > div > form > div > div > div > div > div > div > div > div > div:nth-child(11) > div > div > input',
  SELECTOR_Automatic_Alteration_SEARCH_10: '#tab\\/inquiry\\/search\\/main > div > div > div:nth-child(2) > div > div.MuiCollapse-container.MuiCollapse-entered > div > div > div > div > form > div > div > div > div > div > div > div > div > div:nth-child(12) > div > div > input',

// --- CIS ---
// หน้าเมนูหลัก CIS ค้นหาลูกค้า
  SELECTOR_CIS_MENU_SUB_1_Navigate_1_Menu_Bar_Label: 'a[href="#menu-item-2000"].yui3-menu-label',
  SELECTOR_CIS_MENU_SUB_1_Navigate_2_Menu_Bar_Label: 'a[href="#menu-item-1800"].yui3-menu-label',
  SELECTOR_CIS_MENU_SUB_1_Navigate_3_Menu_Bar_Label: 'a.yui3-menuitem-content[role="menuitem"][href^="/nbsweb/secure/remoteaction/cisapp/react/index.html"]',
  SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_4_Menu_Bar_Label: 'p.MuiTypography-root.MuiTypography-body1.MuiTypography-colorPrimary[style*="font-weight: bold;"]:contains("ค้นหาข้อมูล")',
  SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_5_Input_Text: '#cardId',
  SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_6_Input_Text: '#customerName',
  SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_7_Input_Text: '#customerLastName',
  SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_8_Input_Text: '#tel',
  SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_9_Input_Text: '#policyNo',
  SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_10_Head_Column_Data_Grid: 'div.MUIDataTableHeadCell-data-47:contains("ดูข้อมูล")',
  SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_11_Head_Column_Data_Grid: 'div.MUIDataTableHeadCell-data-47:contains("ประเภทบัตร / หมายเลขบัตร")',
  SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_12_Head_Column_Data_Grid: 'div.MUIDataTableHeadCell-data-47:contains("เลขที่กรมธรรม์")',
  SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_13_Head_Column_Data_Grid: 'div.MUIDataTableHeadCell-data-47:contains("ชื่อ - นามสกุล")',
  SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_14_Head_Column_Data_Grid: 'div.MUIDataTableHeadCell-data-47:contains("ความสัมพันธ์กับกรมธรรม์")',
  SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_15_Head_Column_Data_Grid: 'div.MUIDataTableHeadCell-data-47:contains("วัน / เดือน / ปีเกิด")',
  SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_16_Head_Column_Data_Grid: 'div.MUIDataTableHeadCell-data-47:contains("หมายเลขโทรศัพท์")',
  SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_17_Head_Column_Data_Grid: 'div.MUIDataTableHeadCell-data-47:contains("สถานะลูกค้า")',
  SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_18_Button: 'span.MuiButton-label:contains("ล้างเงื่อนไข")',
  SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_19_Button: 'button[class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary"][type="button"]',
  SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_20_Button: 'span.MuiButton-label.MuiButton-label:contains("สร้าง Case")',
  SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_22_Button: '#MUIDataTableBodyRow-0 > td:nth-child(2) > button > span.MuiIconButton-label > i',
  SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_23_Data_Grid: '#MUIDataTableBodyRow-0 > td:nth-child(4) > div > div:nth-child(1) > i',
  SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_24_Data_Grid: '#MUIDataTableBodyRow-0 > td:nth-child(4) > div > div:nth-child(2) > p',
  SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_25_Data_Grid: '#MUIDataTableBodyRow-0 > td:nth-child(6)',
  SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_26_Data_Grid: '#MUIDataTableBodyRow-0 > td:nth-child(8) > div > div:nth-child(1) > i',
  SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_27_Data_Grid: '#MUIDataTableBodyRow-0 > td:nth-child(8) > div > div:nth-child(2) > p',
  SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_28_Data_Grid: '#MUIDataTableBodyRow-0 > td:nth-child(10)',
  SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_29_Data_Grid: '#MUIDataTableBodyRow-0 > td:nth-child(12) > span > div > div:nth-child(1) > p',
  SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_30_Data_Grid: '#MUIDataTableBodyRow-0 > td:nth-child(14) > p',
  SELECTOR_CIS_MENU_SUB_1_SEARCH_1_In_Page_31_Data_Grid: '#MUIDataTableBodyRow-0 > td:nth-child(16) > p',
};
