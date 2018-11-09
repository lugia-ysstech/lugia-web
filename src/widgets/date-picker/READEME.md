## 日期格式

如果需要展示默认值(defaultValue),就需要指定日期的格式(format), 如果不指定日期格式，默认日期格式是‘YYYY-MM-DD’,
日期格式可以自定义
例如  'YYYY-MM-DD'
      'YYYY/MM/DD'
      'YYYY年MM月DD日'
      'YYYY.MM.DD'
      ....
默认值 和指定的日期格式，可以不一致，但以指定的日期格式为准
例如  defaultValue ={'2016.03.02'} fomat={'YYYY年MM月DD日'}

则得到的value值为2016年03月02日

