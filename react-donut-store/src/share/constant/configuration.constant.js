export const CONFIG = {
  SEARCH_MAX_LENGTH: 50,
  REQUEST_TITLE_MAX_LENGTH: 50,
  PAGE_SIZE: 15,
  PAGE_MAX_SIZE: 2000,
};

export const CONFIG_NAME = {
  LOGO: "logo",
  HEADQUARTER: "headquarter",
  HOT_LINE: "hotLine",
  EMAIL: "email",
  MIN_TOTAL_PRICE: "minTotalPrice",
  FREE_SHIP_DISTANCE: "freeShipDistance",
  MIN_AHA_DISTANCE: "minAhaDistance",
  SUBSIDY_PRICE: "subsidyPrice",
  SINGLE_SHIPPING_PRICE: "singleShippingPrice",
  MIN_SHIPPING_PRICE: "minShippingPrice",
}

export const selectEnabledOption = [
  {
    name: 'Enabled',
    code: true,
  }, {
    name: 'Disabled',
    code: false,
  }
]

export const selectReportDay = [
  {
    name: '1 ngày',
    code: 'a-day',
  }, {
    name: '1 tuần',
    code: 'a-week',
  }, {
    name: '1 tháng',
    code: 'a-month',
  }, {
    name: '1 năm',
    code: 'a-year',
  }, {
    name: 'Toàn bộ thời gian',
    code: 'all',
  }
]