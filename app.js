'use strict'
const http = require('http')
const Bot = require('messenger-bot')

var firebase = require("firebase");
var $ = require('jquery');

var officeJson={"results":[{"_id":"1","content":"萬華分局","X":null,"poi_addr":"台北市康定路22號","display_addr":"臺北市康定路22號","name":"萬華分局","Y":null,"traffic_information":null},{"_id":"2","content":"隸屬中山分局","X":null,"poi_addr":"台北市長安東路二段165號","display_addr":"臺北市長安東路二段165號","name":"長安東路派出所","Y":null,"traffic_information":null},{"_id":"3","content":"信義分局","X":null,"poi_addr":"台北市信義路五段17號","display_addr":"臺北市信義路五段17號","name":"信義分局","Y":null,"traffic_information":null},{"_id":"4","content":"隸屬信義分局","X":null,"poi_addr":"台北市福德街198號","display_addr":"臺北市福德街198號","name":"福德街派出所","Y":null,"traffic_information":null},{"_id":"5","content":"隸屬內湖分局","X":null,"poi_addr":"台北市內湖路二段261號","display_addr":"臺北市內湖路二段261號","name":"內湖派出所","Y":null,"traffic_information":null},{"_id":"6","content":"隸屬萬華分局","X":null,"poi_addr":"台北市漢中街122號","display_addr":"臺北市漢中街122號","name":"漢中街派出所","Y":null,"traffic_information":null},{"_id":"7","content":"臺北市政府警察局總局","X":null,"poi_addr":"台北市延平南路96號","display_addr":"臺北市延平南路96號","name":"臺北市政府警察局總局","Y":null,"traffic_information":null},{"_id":"8","content":"隸屬士林分局","X":null,"poi_addr":"台北市中山北路七段192號","display_addr":"臺北市中山北路七段192號","name":"天母派出所","Y":null,"traffic_information":null},{"_id":"9","content":"隸屬北投分局","X":null,"poi_addr":"台北市泉源路14號","display_addr":"臺北市泉源路14號","name":"光明派出所","Y":null,"traffic_information":null},{"_id":"10","content":"隸屬中正第二分局","X":null,"poi_addr":"台北市汀州路三段72號","display_addr":"臺北市汀州路三段72號","name":"思源街派出所","Y":null,"traffic_information":null},{"_id":"11","content":"隸屬萬華分局","X":null,"poi_addr":"台北市莒光路171號","display_addr":"臺北市莒光路171號","name":"莒光派出所","Y":null,"traffic_information":null},{"_id":"12","content":"隸屬南港分局","X":null,"poi_addr":"台北市舊莊街一段213號","display_addr":"臺北市舊莊街一段213號","name":"舊庄派出所","Y":null,"traffic_information":null},{"_id":"13","content":"隸屬內湖分局","X":null,"poi_addr":"台北市金湖路83號","display_addr":"臺北市金湖路83號","name":"康寧派出所","Y":null,"traffic_information":null},{"_id":"14","content":"隸屬松山分局","X":null,"poi_addr":"台北市八德路四段692號","display_addr":"臺北市八德路四段692號","name":"松山派出所","Y":null,"traffic_information":null},{"_id":"15","content":"隸屬萬華分局","X":null,"poi_addr":"台北市東園街17號","display_addr":"臺北市東園街17號","name":"西園路派出所","Y":null,"traffic_information":null},{"_id":"16","content":"隸屬士林分局","X":null,"poi_addr":"台北市中社路一段56號","display_addr":"臺北市中社路一段56號","name":"翠山派出所","Y":null,"traffic_information":null},{"_id":"17","content":"隸屬大同分局","X":null,"poi_addr":"台北市延平北路一段86號","display_addr":"臺北市延平北路一段86號","name":"延平派出所","Y":null,"traffic_information":null},{"_id":"18","content":"隸屬中正第一分局","X":null,"poi_addr":"台北市忠孝東路二段10號","display_addr":"臺北市忠孝東路二段10號","name":"忠孝東路派出所","Y":null,"traffic_information":null},{"_id":"19","content":"隸屬大同分局","X":null,"poi_addr":"台北市保安街47-1號","display_addr":"臺北市保安街47-1號","name":"民生西路派出所","Y":null,"traffic_information":null},{"_id":"20","content":"隸屬萬華分局","X":null,"poi_addr":"台北市西寧南路4號","display_addr":"臺北市西寧南路4號","name":"武昌街派出所","Y":null,"traffic_information":null},{"_id":"21","content":"隸屬北投分局","X":null,"poi_addr":"台北市中央北路一段1號","display_addr":"臺北市中央北路一段1號","name":"長安派出所","Y":null,"traffic_information":null},{"_id":"22","content":"隸屬萬華分局","X":null,"poi_addr":"台北市長泰街130號","display_addr":"臺北市長泰街130號","name":"東園街派出所","Y":null,"traffic_information":null},{"_id":"23","content":"隸屬中正第一分局","X":null,"poi_addr":"台北市公園路15號","display_addr":"臺北市公園路15號","name":"忠孝西路派出所","Y":null,"traffic_information":null},{"_id":"24","content":"少年警察隊","X":null,"poi_addr":"台北市信義路五段180號","display_addr":"臺北市信義路五段180號","name":"少年警察隊","Y":null,"traffic_information":null},{"_id":"25","content":"隸屬萬華分局","X":null,"poi_addr":"台北市萬大路423巷114號","display_addr":"臺北市萬大路423巷114號","name":"青年路派出所","Y":null,"traffic_information":null},{"_id":"26","content":"隸屬信義分局","X":null,"poi_addr":"台北市永吉路333號","display_addr":"臺北市永吉路333號","name":"五分埔派出所","Y":null,"traffic_information":null},{"_id":"27","content":"隸屬文山第一分局","X":null,"poi_addr":"台北市文山區恆光街45號","display_addr":"臺北市文山區恆光街45號","name":"木新派出所","Y":null,"traffic_information":null},{"_id":"28","content":"隸屬中正第一分局","X":null,"poi_addr":"台北市博愛路119號","display_addr":"臺北市博愛路119號","name":"博愛路派出所","Y":null,"traffic_information":null},{"_id":"29","content":"隸屬北投分局","X":null,"poi_addr":"台北市文林北路296號","display_addr":"臺北市文林北路296號","name":"石牌派出所","Y":null,"traffic_information":null},{"_id":"30","content":"隸屬南港分局","X":null,"poi_addr":"台北市向陽路150號","display_addr":"臺北市向陽路150號","name":"玉成派出所","Y":null,"traffic_information":null},{"_id":"31","content":"隸屬北投分局","X":null,"poi_addr":"台北市中和街534號","display_addr":"臺北市中和街534號","name":"大屯派出所","Y":null,"traffic_information":null},{"_id":"32","content":"隸屬內湖分局","X":null,"poi_addr":"台北市成功路五段1號","display_addr":"臺北市成功路五段1號","name":"大湖派出所","Y":null,"traffic_information":null},{"_id":"33","content":"隸屬中正第二分局","X":null,"poi_addr":"台北市中華路二段503號","display_addr":"臺北市中華路二段503號","name":"泉州街派出所","Y":null,"traffic_information":null},{"_id":"34","content":"隸屬中正第二分局","X":null,"poi_addr":"台北市南海路35號","display_addr":"臺北市南海路35號","name":"南海路派出所","Y":null,"traffic_information":null},{"_id":"35","content":"隸屬士林分局","X":null,"poi_addr":"台北市延平北路六段237號","display_addr":"臺北市延平北路六段237號","name":"社子派出所","Y":null,"traffic_information":null},{"_id":"36","content":"隸屬中正第二分局","X":null,"poi_addr":"台北市廈門街43號","display_addr":"臺北市廈門街43號","name":"廈門街派出所","Y":null,"traffic_information":null},{"_id":"37","content":"南港分局","X":null,"poi_addr":"台北市向陽路150號","display_addr":"臺北市向陽路150號","name":"南港分局","Y":null,"traffic_information":null},{"_id":"38","content":"隸屬中正第一分局","X":null,"poi_addr":"台北市仁愛路一段19號","display_addr":"臺北市仁愛路一段19號","name":"仁愛路派出所","Y":null,"traffic_information":null},{"_id":"39","content":"中山分局","X":null,"poi_addr":"台北市中山北路二段1號","display_addr":"臺北市中山北路二段1號","name":"中山分局","Y":null,"traffic_information":null},{"_id":"40","content":"隸屬中山分局","X":null,"poi_addr":"台北市中山北路三段62號","display_addr":"臺北市中山北路三段62號","name":"圓山派出所","Y":null,"traffic_information":null},{"_id":"41","content":"隸屬士林分局","X":null,"poi_addr":"台北市中山北路六段153號","display_addr":"臺北市中山北路六段153號","name":"蘭雅派出所","Y":null,"traffic_information":null},{"_id":"42","content":"隸屬北投分局","X":null,"poi_addr":"台北市竹子湖路16號","display_addr":"臺北市竹子湖路16號","name":"竹子湖派出所","Y":null,"traffic_information":null},{"_id":"43","content":"隸屬士林分局","X":null,"poi_addr":"台北市仰德大道一段16號","display_addr":"臺北市仰德大道一段16號","name":"芝山岩派出所","Y":null,"traffic_information":null},{"_id":"44","content":"隸屬萬華分局","X":null,"poi_addr":"台北市昆明街245號","display_addr":"臺北市昆明街245號","name":"昆明街派出所","Y":null,"traffic_information":null},{"_id":"45","content":"隸屬中山分局","X":null,"poi_addr":"台北市民族東路284號","display_addr":"臺北市民族東路284號","name":"建國派出所","Y":null,"traffic_information":null},{"_id":"46","content":"隸屬大安分局","X":null,"poi_addr":"台北市羅斯福路四段113巷13號","display_addr":"臺北市羅斯福路四段113巷13號","name":"羅斯福路派出所","Y":null,"traffic_information":null},{"_id":"47","content":"隸屬中山分局","X":null,"poi_addr":"台北市北安路456號","display_addr":"臺北市北安路456號","name":"大直派出所","Y":null,"traffic_information":null},{"_id":"48","content":"隸屬文山第二分局","X":null,"poi_addr":"台北市興隆路二段156號","display_addr":"臺北市興隆路二段156號","name":"興隆派出所","Y":null,"traffic_information":null},{"_id":"49","content":"大安分局","X":null,"poi_addr":"台北市仁愛路三段2號","display_addr":"臺北市仁愛路三段2號","name":"大安分局","Y":null,"traffic_information":null},{"_id":"50","content":"隸屬中山分局","X":null,"poi_addr":"台北市新生北路二段127-1號","display_addr":"臺北市新生北路二段127-1號","name":"民權一派出所","Y":null,"traffic_information":null},{"_id":"51","content":"隸屬萬華分局","X":null,"poi_addr":"台北市萬華區西園路1段156之1號","display_addr":"臺北市萬華區西園路1段156之1號","name":"桂林路派出所","Y":null,"traffic_information":null},{"_id":"52","content":"隸屬北投分局","X":null,"poi_addr":"台北市紗帽路110號","display_addr":"臺北市紗帽路110號","name":"公園派出所","Y":null,"traffic_information":null},{"_id":"53","content":"隸屬大同分局","X":null,"poi_addr":"台北市重慶北路三段168號","display_addr":"臺北市重慶北路三段168號","name":"民族路派出所","Y":null,"traffic_information":null},{"_id":"54","content":"隸屬大同分局","X":null,"poi_addr":"台北市錦西街200號","display_addr":"臺北市錦西街200號","name":"寧夏路派出所","Y":null,"traffic_information":null},{"_id":"55","content":"隸屬內湖分局","X":null,"poi_addr":"台北市康樂街110巷16弄20號","display_addr":"臺北市康樂街110巷16弄20號","name":"康樂派出所","Y":null,"traffic_information":null},{"_id":"56","content":"隸屬中山分局","X":null,"poi_addr":"台北市長春路206號","display_addr":"臺北市長春路206號","name":"長春路派出所","Y":null,"traffic_information":null},{"_id":"57","content":"隸屬士林分局","X":null,"poi_addr":"台北市格致路39號","display_addr":"臺北市格致路39號","name":"山仔後派出所","Y":null,"traffic_information":null},{"_id":"58","content":"士林分局","X":null,"poi_addr":"台北市文林路235號","display_addr":"臺北市文林路235號","name":"士林分局","Y":null,"traffic_information":null},{"_id":"59","content":"隸屬萬華分局","X":null,"poi_addr":"台北市大理街99號","display_addr":"臺北市大理街99號","name":"大理街派出所","Y":null,"traffic_information":null},{"_id":"60","content":"內湖分局","X":null,"poi_addr":"台北市民權東路六段101號","display_addr":"臺北市民權東路六段101號","name":"內湖分局","Y":null,"traffic_information":null},{"_id":"61","content":"隸屬士林分局","X":null,"poi_addr":"台北市至善路三段263號","display_addr":"臺北市至善路三段263號","name":"溪山派出所","Y":null,"traffic_information":null},{"_id":"62","content":"隸屬大同分局","X":null,"poi_addr":"台北市承德路一段80號","display_addr":"臺北市承德路一段80號","name":"建成派出所","Y":null,"traffic_information":null},{"_id":"63","content":"北投分局","X":null,"poi_addr":"台北市中央北路一段1號","display_addr":"臺北市中央北路一段1號","name":"北投分局","Y":null,"traffic_information":null},{"_id":"64","content":"隸屬松山分局","X":null,"poi_addr":"台北市敦化北路199巷5-1號","display_addr":"臺北市敦化北路199巷5-1號","name":"東社派出所","Y":null,"traffic_information":null},{"_id":"65","content":"隸屬內湖分局","X":null,"poi_addr":"台北市民權東路六段26號","display_addr":"臺北市民權東路六段26號","name":"文德派出所","Y":null,"traffic_information":null},{"_id":"66","content":"隸屬文山第一分局","X":null,"poi_addr":"台北市指南路二段177號","display_addr":"臺北市指南路二段177號","name":"指南派出所","Y":null,"traffic_information":null},{"_id":"67","content":"隸屬萬華分局","X":null,"poi_addr":"台北市環河南路二段196號","display_addr":"臺北市環河南路二段196號","name":"華江派出所","Y":null,"traffic_information":null},{"_id":"68","content":"隸屬松山分局","X":null,"poi_addr":"台北市民生東路5段163-1號","display_addr":"臺北市民生東路5段163-1號","name":"三民派出所","Y":null,"traffic_information":null},{"_id":"69","content":"隸屬內湖分局","X":null,"poi_addr":"台北市五分街10號","display_addr":"臺北市五分街10號","name":"東湖派出所","Y":null,"traffic_information":null},{"_id":"70","content":"隸屬文山第一分局","X":null,"poi_addr":"台北市木柵路一段54號","display_addr":"臺北市木柵路一段54號","name":"復興派出所","Y":null,"traffic_information":null},{"_id":"71","content":"隸屬中正第二分局","X":null,"poi_addr":"台北市南昌路一段7號","display_addr":"臺北市南昌路一段7號","name":"南昌街派出所","Y":null,"traffic_information":null},{"_id":"72","content":"隸屬內湖分局","X":null,"poi_addr":"台北市內湖路一段550號","display_addr":"臺北市內湖路一段550號","name":"港墘派出所","Y":null,"traffic_information":null},{"_id":"73","content":"隸屬大安分局","X":null,"poi_addr":"台北市信義路四段216號","display_addr":"臺北市信義路四段216號","name":"安和路派出所","Y":null,"traffic_information":null},{"_id":"74","content":"隸屬中山分局","X":null,"poi_addr":"台北市中山北路二段90號","display_addr":"臺北市中山北路二段90號","name":"中山二派出所","Y":null,"traffic_information":null},{"_id":"75","content":"保安警察大隊","X":null,"poi_addr":"台北市延壽街339號","display_addr":"臺北市延壽街339號","name":"保安警察大隊","Y":null,"traffic_information":null},{"_id":"76","content":"隸屬大安分局","X":null,"poi_addr":"台北市和平東路一段143號","display_addr":"臺北市和平東路一段143號","name":"和平東路派出所","Y":null,"traffic_information":null},{"_id":"77","content":"隸屬大安分局","X":null,"poi_addr":"台北市仁愛路三段18號","display_addr":"臺北市仁愛路三段18號","name":"新生南路派出所","Y":null,"traffic_information":null},{"_id":"78","content":"隸屬士林分局","X":null,"poi_addr":"台北市文林路235號","display_addr":"臺北市文林路235號","name":"文林派出所","Y":null,"traffic_information":null},{"_id":"79","content":"隸屬信義分局","X":null,"poi_addr":"台北市信義路五段17號","display_addr":"臺北市信義路五段17號","name":"三張犁派出所","Y":null,"traffic_information":null},{"_id":"80","content":"大同分局","X":null,"poi_addr":"台北市錦西街200號","display_addr":"臺北市錦西街200號","name":"大同分局","Y":null,"traffic_information":null},{"_id":"81","content":"中正第二分局","X":null,"poi_addr":"台北市南海路35號","display_addr":"臺北市南海路35號","name":"中正第二分局","Y":null,"traffic_information":null},{"_id":"82","content":"隸屬大同分局","X":null,"poi_addr":"台北市延平北路三段2號","display_addr":"臺北市延平北路三段2號","name":"大橋派出所","Y":null,"traffic_information":null},{"_id":"83","content":"交通警察大隊","X":null,"poi_addr":"台北市北平東路1號","display_addr":"臺北市北平東路1號","name":"交通警察大隊","Y":null,"traffic_information":null},{"_id":"84","content":"隸屬信義分局","X":null,"poi_addr":"台北市吳興街262號","display_addr":"臺北市吳興街262號","name":"吳興街派出所","Y":null,"traffic_information":null},{"_id":"85","content":"隸屬中山分局","X":null,"poi_addr":"台北市中山北路一段110號","display_addr":"臺北市中山北路一段110號","name":"中山一派出所","Y":null,"traffic_information":null},{"_id":"86","content":"隸屬大安分局","X":null,"poi_addr":"台北市敦化南路一段236巷26號","display_addr":"臺北市敦化南路一段236巷26號","name":"敦化南路派出所","Y":null,"traffic_information":null},{"_id":"87","content":"文山第二分局","X":null,"poi_addr":"台北市景中街2號","display_addr":"臺北市景中街2號","name":"文山第二分局","Y":null,"traffic_information":null},{"_id":"88","content":"婦幼警察隊","X":null,"poi_addr":"台北市信義路五段180號","display_addr":"臺北市信義路五段180號","name":"婦幼警察隊","Y":null,"traffic_information":null},{"_id":"89","content":"隸屬北投分局","X":null,"poi_addr":"台北市大度路三段305號","display_addr":"臺北市大度路三段305號","name":"關渡派出所","Y":null,"traffic_information":null},{"_id":"90","content":"隸屬萬華分局","X":null,"poi_addr":"台北市和平西路三段112號","display_addr":"臺北市和平西路三段112號","name":"康定路派出所","Y":null,"traffic_information":null},{"_id":"91","content":"隸屬士林分局","X":null,"poi_addr":"台北市福港街151號","display_addr":"臺北市福港街151號","name":"後港派出所","Y":null,"traffic_information":null},{"_id":"92","content":"隸屬信義分局","X":null,"poi_addr":"台北市嘉興街301號","display_addr":"臺北市嘉興街301號","name":"六張犁派出所","Y":null,"traffic_information":null},{"_id":"93","content":"隸屬內湖分局","X":null,"poi_addr":"台北市瑞光路515號","display_addr":"臺北市瑞光路515號","name":"西湖派出所","Y":null,"traffic_information":null},{"_id":"94","content":"中正第一分局","X":null,"poi_addr":"台北市公園路15號","display_addr":"臺北市公園路15號","name":"中正第一分局","Y":null,"traffic_information":null},{"_id":"95","content":"隸屬大同分局","X":null,"poi_addr":"台北市重慶北路三段320-2號","display_addr":"臺北市重慶北路三段320-2號","name":"重慶北路派出所","Y":null,"traffic_information":null},{"_id":"96","content":"隸屬松山分局","X":null,"poi_addr":"台北市民權東路3段162號","display_addr":"臺北市民權東路3段162號","name":"民有派出所","Y":null,"traffic_information":null},{"_id":"97","content":"隸屬大安分局","X":null,"poi_addr":"台北市瑞安街23巷17號","display_addr":"臺北市瑞安街23巷17號","name":"瑞安街派出所","Y":null,"traffic_information":null},{"_id":"98","content":"隸屬內湖分局","X":null,"poi_addr":"台北市新明路324號","display_addr":"臺北市新明路324號","name":"潭美派出所","Y":null,"traffic_information":null},{"_id":"99","content":"刑事警察大隊","X":null,"poi_addr":"台北市武昌街一段69號","display_addr":"臺北市武昌街一段69號","name":"刑事警察大隊","Y":null,"traffic_information":null},{"_id":"100","content":"通信隊","X":null,"poi_addr":"台北市延平南路96號","display_addr":"臺北市延平南路96號","name":"通信隊","Y":null,"traffic_information":null},{"_id":"101","content":"隸屬北投分局","X":null,"poi_addr":"台北市石牌路二段101號","display_addr":"臺北市石牌路二段101號","name":"永明派出所","Y":null,"traffic_information":null},{"_id":"102","content":"隸屬文山第二分局","X":null,"poi_addr":"台北市羅斯福路五段151號","display_addr":"臺北市羅斯福路五段151號","name":"萬盛派出所","Y":null,"traffic_information":null},{"_id":"103","content":"松山分局","X":null,"poi_addr":"台北市南京東路四段12號","display_addr":"臺北市南京東路四段12號","name":"松山分局","Y":null,"traffic_information":null},{"_id":"104","content":"隸屬大同分局","X":null,"poi_addr":"台北市民生西路198號","display_addr":"臺北市民生西路198號","name":"雙連派出所","Y":null,"traffic_information":null},{"_id":"105","content":"捷運警察隊","X":null,"poi_addr":"台北市華陰街32號","display_addr":"臺北市華陰街32號","name":"捷運警察隊","Y":null,"traffic_information":null},{"_id":"106","content":"隸屬士林分局","X":null,"poi_addr":"台北市仰德大道三段49號","display_addr":"臺北市仰德大道三段49號","name":"永福派出所","Y":null,"traffic_information":null},{"_id":"107","content":"隸屬文山第一分局","X":null,"poi_addr":"台北市萬美街一段50號","display_addr":"臺北市萬美街一段50號","name":"萬芳派出所","Y":null,"traffic_information":null},{"_id":"108","content":"隸屬南港分局","X":null,"poi_addr":"台北市興中路12巷2號","display_addr":"臺北市興中路12巷2號","name":"南港派出所","Y":null,"traffic_information":null},{"_id":"109","content":"隸屬大安分局","X":null,"poi_addr":"台北市臥龍街185號","display_addr":"臺北市臥龍街185號","name":"臥龍街派出所","Y":null,"traffic_information":null},{"_id":"110","content":"隸屬文山第二分局","X":null,"poi_addr":"台北市景中街2號","display_addr":"臺北市景中街2號","name":"景美派出所","Y":null,"traffic_information":null},{"_id":"111","content":"隸屬北投分局","X":null,"poi_addr":"台北市公館路209巷11號","display_addr":"臺北市公館路209巷11號","name":"奇岩派出所","Y":null,"traffic_information":null},{"_id":"112","content":"隸屬文山第一分局","X":null,"poi_addr":"台北市木柵路二段202號","display_addr":"臺北市木柵路二段202號","name":"木柵派出所","Y":null,"traffic_information":null},{"_id":"113","content":"隸屬中正第一分局","X":null,"poi_addr":"台北市公園路54號","display_addr":"臺北市公園路54號","name":"介壽路派出所","Y":null,"traffic_information":null},{"_id":"114","content":"文山第一分局","X":null,"poi_addr":"台北市木柵路二段202號","display_addr":"臺北市木柵路二段202號","name":"文山第一分局","Y":null,"traffic_information":null},{"_id":"115","content":"隸屬南港分局","X":null,"poi_addr":"台北市同德路83號","display_addr":"臺北市同德路83號","name":"同德派出所","Y":null,"traffic_information":null},{"_id":"116","content":"隸屬松山分局","X":null,"poi_addr":"台北市南京東路四段12號","display_addr":"臺北市南京東路四段12號","name":"中崙派出所","Y":null,"traffic_information":null}]};
var json = JSON.stringify(officeJson);
console.log(json);
var officeJsonParse = JSON.parse(json);


// var results = Papa.parse(data.csv);
// console.log(results);

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDVs84WWn1zigkUQckSRt_YSa8_IwfFtvI",
    authDomain: "fbfone-674e6.firebaseapp.com",
    databaseURL: "https://fbfone-674e6.firebaseio.com",
    storageBucket: "fbfone-674e6.appspot.com",
  };
  firebase.initializeApp(config);

let bot = new Bot({
  token: 'EAAZAKqE31uQMBAG7lg1WJO6qMJ4H6XaRQlcQXBUePZC4UtYicKDx2tNZBOl1NQdquZCkDalosfiXCr0rLlhSpU19U5S1ZBbyY5rCEgCFLdxU4Ff3qxWGWXVMzZAV7dCyNbUjkHDfEuK5vgRDwCFW9StlwZCBCzDqeScfhvZB5GdH4gZDZD',
  verify: 'robotfine'
})

bot.on('error', (err) => {
  console.log(err.message)
})



var stockPrice2330 = "";
firebase.database().ref('stocks/2330').on('value', function(snapshot) {
          stockPrice2330 = snapshot.val().price;
          console.log("把firebase拿出來")
});
var priceup2330 = 0;
var pricedown2330 = 0;
 var priceuppercent2330 = priceup2330/(priceup2330 + pricedown2330);
var pricedownpercent2330 = pricedown2330/(priceup2330 + pricedown2330);
var pricepercent2330 = "漲的機率為"+String(Math.ceil(priceuppercent2330*100)/100)+",跌的機率為"+String(Math.ceil(pricedownpercent2330*100)/100);


firebase.database().ref('stocks/2330/prepriceup').on('value', function(snapshot) {
           priceup2330 = snapshot.numChildren();
          console.log("漲的票數為"+priceup2330);
          if (priceup2330==0 || pricedown2330==0 ){
            pricepercent2330 = "漲的機率為"+String(priceup2330/(1+pricedown2330))+",跌的機率為"+String(pricedown2330/1+priceup2330);
          } else {
            var priceuppercent2330 = priceup2330/(priceup2330 + pricedown2330);
            var pricedownpercent2330 = pricedown2330/(priceup2330 + pricedown2330);
            console.log(priceup2330,pricedown2330);
          pricepercent2330 = "漲的機率為"+String(Math.ceil(priceuppercent2330*100)/100)+",跌的機率為"+String(Math.ceil(pricedownpercent2330*100)/100);          }
          console.log(pricepercent2330);
});
firebase.database().ref('stocks/2330/prepricedown').on('value', function(snapshot) {
           pricedown2330 = snapshot.numChildren();
          console.log("跌的票數為"+pricedown2330);
           if (priceup2330==0 || pricedown2330==0 ){
            pricepercent2330 = "漲的機率為"+String(priceup2330/(1+pricedown2330))+",跌的機率為"+String(pricedown2330/(1+priceup2330));
          } else {
             var priceuppercent2330 = priceup2330/(priceup2330 + pricedown2330);
            var pricedownpercent2330 = pricedown2330/(priceup2330 + pricedown2330);
            console.log(priceup2330,pricedown2330);
          pricepercent2330 = "漲的機率為"+String(Math.ceil(priceuppercent2330*100)/100)+",跌的機率為"+String(Math.ceil(pricedownpercent2330*100)/100);          }
           console.log(pricepercent2330);
});

bot.on('message', (payload, reply) => {


  bot.getProfile(payload.sender.id, (err, profile) => {
    var locationLat="";
    var locationLng="";
    
                
  let text = payload.message.text;
  if (text == "找手機"){
  firebase.database().ref('users/'+profile.last_name+profile.first_name).update({'status':true});
  reply({ "text" : "你的手機正在響啦～～～" }, (err) => { })
  }else if (text == "手機不見啦"){

    firebase.database().ref('users/'+profile.last_name+profile.first_name).once('value', function(snapshot) {
      locationLat=snapshot.val().location.lat;
      locationLng=snapshot.val().location.lng;
      console.log("你手機目前位置： https://www.google.com.tw/maps/@"+locationLat+","+locationLng+",17z");
      reply({ "text" : "你手機目前位置： https://www.google.com.tw/maps/@"+locationLat+","+locationLng+",17z" }, (err) => { });
    });
    firebase.database().ref('users/'+profile.last_name+profile.first_name).once('value', function(snapshot) {
       var address=snapshot.val().address;
      var address2=snapshot.val().address2;
      console.log("目前位置："+address);
      reply({ "text" : "目前位置："+address}, (err) => { });
    });
  }else if(text == "附近警察局"){
     firebase.database().ref('users/'+profile.last_name+profile.first_name).once('value', function(snapshot) {
      var address=snapshot.val().address;
      var address2=snapshot.val().address2;
      // console.log("目前位置："+address+"!!!!!!");
      // reply({ "text" : "目前位置："+address+"!!!!!!" }, (err) => { });
      reply({ "text" : "搜尋"+address2+"區附近警察局：" }, (err) => { });
      for (var i=0;i<officeJsonParse.results.length;i++){
        if (officeJsonParse.results[i].content.match(address2)!=null){
          console.log("名稱："+officeJsonParse.results[i].name+"地址："+officeJsonParse.results[i].poi_addr);
          reply({ "text" : "名稱："+officeJsonParse.results[i].name+"地址："+officeJsonParse.results[i].poi_addr }, (err) => { });
        }
      }
    });
  }
  else if(text == "#台積電"){
           bot.getProfile(payload.sender.id, (err, profile) => {
              reply({ "text" : "台積電的今日股價是："+stockPrice2330+"，機器人我推薦你明天買進，因為「8/19」的新聞有寫到「台積電獨攬蘋果A11處理器訂單」。" }, (err) => {
                console.log("test1");
                console.log(stockPrice2330);
              }) 
              reply({ "text" : profile.first_name+'，投資理財有賺有賠，風險自負XD' }, (err) => {
                console.log("test3"); 
              })
              reply({ "text" : "輸入「#台積電預測漲」或「#台積電預測跌」即可預測明日股價結果。" }, (err) => {
                console.log("test3"); 
              })
          })
    }else if (text == "#台積電預測漲"){
      var name = profile.last_name+profile.first_name;
      var foo = {}; 
      foo[name] = true; 
      firebase.database().ref('stocks/2330/prepriceup/').update(foo);
      firebase.database().ref('stocks/2330/prepriceup/').on('value', function(snapshot) {
         reply({ "text" : "以下是大家預測台積電明日漲跌結果：\n "+pricepercent2330 }, (err) => { });
       });
       console.log(pricepercent2330);
    }else if (text == "#台積電預測跌"){
      var name = profile.last_name+profile.first_name;
      var foo = {}; 
      foo[name] = true; 
      firebase.database().ref('stocks/2330/prepricedown/').update(foo);
      firebase.database().ref('stocks/2330/prepricedown/').on('value', function(snapshot) {
         reply({ "text" : "以下是大家預測台積電明日漲跌結果：\n "+pricepercent2330 }, (err) => { })
       });
       console.log(pricepercent2330);
    } else if (text.match('尋找')!=null){
    // firebase.database().ref('users/'+profile.last_name+profile.first_name).on('value', function(snapshot) {
    //   locationLat=snapshot.val().location.lat;
    //   locationLng=snapshot.val().location.lng;
    //   console.log("https://www.google.com.tw/maps/@"+locationLat+","+locationLng);
      var number = Math.random();
      if (number<0.3){
      reply({ "text" : "在中正紀念堂" }, (err) => { })
      }else if (number<0.6){
      reply({ "text" : "在大安森林公園" }, (err) => { })
      }else {
      reply({ "text" : "在北投公園" }, (err) => { })  
      }
    // })
      
  }else if(text == "你好"|text=="哈囉"|text=="hello"|text=="嘿"){
reply({ "text" : profile.first_name+"，你好～"+"很高興為你服務，我的名字是Fonear，尋找手機可輸入「找手機」(ring)和「手機不見啦」(location)\n「#台積電」「附近警察局」..." }, (err) => { })
  }
    else{
              reply({ 'text':'我無法理解你在說什麼，但你說的是，「'+text+'」，讓我慢慢消化人類的語言，BTW，我來自台大黑客松Team86!!!我好想得獎讓我主人驕傲~~~>"<' }, (err) => {
                console.log("test2")
                console.log(text)
              }) 
    }


          })
})

http.createServer(bot.middleware()).listen(3000)

 console.log('Echo bot server running at port 3000.') 