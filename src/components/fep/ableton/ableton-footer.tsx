import { ReactNode } from "react";
import AbletonLogo from "./ableton-logo";

const AbletonFooter = () => {
  return (
    <div className="border-t-2 border-opacity-50 pt-16 pb-8 w-full">
      <div className="flex flex-col mx-[10%]">
        <div className="font-medium text-4xl mb-4 lg:text-5xl lg:mb-8">
          Ableton
        </div>
        <div
          className="flex flex-col text-sm space-y-8
          lg:grid lg:grid-flow-col lg:grid-cols-[4fr,4fr,6fr] lg:grid-rows-2
          lg:items-baseline"
        >
          <FooterSection
            className="lg:col-start-3"
            header="Sign up to our newsletter"
          >
            <span className="leading-6">
              Enter your email address to stay up to date with the latest
              offers, tutorials, downloads, surveys and more.
            </span>
            <div className="flex my-4">
              <input
                className="min-w-0 grow bg-black bg-opacity-10 px-2 "
                type="email"
                placeholder="Email Address"
              />
              <button className="bg-[#0000ff] text-white py-2 px-4 flex-shrink-0">
                Sign up
              </button>
            </div>
          </FooterSection>
          <FooterSection>
            <SectionLinks
              links={["Register Live or Push", "About Ableton", "Jobs"]}
            />
            <div className="flex flex-col space-y-1">
              <div className="flex space-x-2 py-2">
                <a href={"#facebook"}>
                  <FacebookSVG />
                </a>
                <a href={"#twitter"}>
                  <TwitterSVG />
                </a>
                <a href={"#youtube"}>
                  <YoutubeSVG />
                </a>
                <a href={"#instagram"}>
                  <InstagramSVG />
                </a>
              </div>
            </div>
          </FooterSection>
          <FooterSection className="lg:col-start-2" header="Education">
            <SectionLinks
              links={[
                "Find Ableton User Groups",
                "Find Certified Training",
                "Become a Certified Trainer",
              ]}
            />
          </FooterSection>
          <FooterSection header="Community">
            <SectionLinks
              links={[
                "Find Ableton User Groups",
                "Find Certified Training",
                "Become a Certified Trainer",
              ]}
            />
          </FooterSection>
          <FooterSection header="Distributors">
            <SectionLinks links={["Find Distributors", "Try Push in-store"]} />
          </FooterSection>
          <FooterSection header="Language and Location">
            <div className="flex flex-wrap text-xs font-medium">
              <select
                className="w-32 max-w-full bg-black bg-opacity-10 p-2 mr-1 mb-1"
                defaultValue="English"
              >
                {languages.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <select
                className="w-64 max-w-full bg-black bg-opacity-10 p-2 mb-1"
                defaultValue="Morocco"
              >
                {countries.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </FooterSection>
        </div>
        <div className="flex flex-col mt-8 lg:flex-row lg:items-center lg:pb-16">
          <FooterSection>
            <div
              className="flex flex-col space-y-3
               lg:flex-row lg:space-x-3 lg:space-y-0"
            >
              {[
                "Archive",
                "Contact Us",
                "Press Resources",
                "Legal Info",
                "Privacy Policy",
                "Cookie Settings",
                "Imprint",
              ].map((link) => (
                <a className="text-xs font-medium" href={`#${link}`} key={link}>
                  {link}
                </a>
              ))}
            </div>
          </FooterSection>
          <div className="hidden: lg:block grow" />
          <FooterSection>
            <div className="flex items-center pt-16 pb-8 lg:p-0">
              <AbletonLogo className="mr-4" />
              <span className="text-xs font-medium">Made in Berlin</span>
            </div>
          </FooterSection>
        </div>
      </div>
    </div>
  );
};

type FooterSection = {
  className?: string;
  header?: string;
  children: ReactNode;
};

const FooterSection = ({ header, children, className = "" }: FooterSection) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {header && <span className="font-medium leading-7">{header}</span>}
      {children}
    </div>
  );
};

type SectionLinks = {
  links: string[];
};

const SectionLinks = ({ links }: SectionLinks) => {
  return (
    <div className="flex flex-col space-y-1">
      {links.map((link) => (
        <a key={link} href="#">{`${link} >`}</a>
      ))}
    </div>
  );
};

const FacebookSVG = () => {
  return (
    <svg
      className="w-10 h-10 bg-[#3477f2]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      role="img"
      focusable="false"
    >
      <title>Facebook</title>
      <path
        d="M33.334 20a13.333 13.333 0 10-15.417
          13.167v-9.312h-3.385V20h3.385v-2.933c0-3.342 1.991-5.187
          5.036-5.187a20.5 20.5 0 012.985.26v3.277h-1.681a1.927 1.927 0 00-2.173
          2.082v2.5h3.7l-.591 3.854h-3.109v9.314A13.337 13.337 0 0033.334 20z"
        fill="#fff"
      />
      <path
        d="M25.19 23.854L25.781 20h-3.7v-2.5a1.927 1.927 0
          012.173-2.082h1.681v-3.283a20.5 20.5 0 00-2.985-.26c-3.046 0-5.036
          1.846-5.036 5.188v2.938h-3.383v3.854h3.385v9.32a13.473 13.473 0
          004.167 0v-9.317z"
        fill="#3477f2"
      />
    </svg>
  );
};

const TwitterSVG = () => {
  return (
    <svg
      className="w-10 h-10 bg-[#34a1f2]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      role="img"
      focusable="false"
    >
      <title>Twitter</title>
      <path
        d="M15.362 30.159a14.5 14.5 0
          0014.594-14.594c0-.222 0-.443-.015-.663a10.436 10.436 0 002.559-2.655
          10.238 10.238 0 01-2.946.807 5.147 5.147 0 002.255-2.837 10.279 10.279
          0 01-3.257 1.245 5.134 5.134 0 00-8.741 4.678A14.562 14.562 0 019.24
          10.781a5.133 5.133 0 001.588 6.847 5.091 5.091 0
          01-2.328-.642v.065a5.131 5.131 0 004.115 5.028 5.121 5.121 0
          01-2.316.088 5.135 5.135 0 004.792 3.562 10.292 10.292 0 01-6.37
          2.2 10.441 10.441 0 01-1.221-.074 14.521 14.521 0 007.862 2.3"
        fill="#fff"
      />
    </svg>
  );
};

const YoutubeSVG = () => {
  return (
    <svg
      className="w-10 h-10 bg-[#ed462f]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      role="img"
      focusable="false"
    >
      <title>Youtube</title>
      <path
        d="M32.776 13.601a3.351 3.351 0 00-2.358-2.373C28.339 10.667 20
          10.667 20 10.667s-8.339 0-10.418.561a3.351 3.351 0 00-2.358 2.373 35.146
          35.146 0 00-.557 6.46 35.146 35.146 0 00.557 6.46 3.351 3.351 0 002.358
          2.373c2.08.561 10.418.561 10.418.561s8.339 0 10.418-.561a3.351 3.351 0
          002.358-2.373 35.146 35.146 0 00.557-6.46 35.146 35.146 0 00-.557-6.46z"
        fill="#fff"
      />
      <path d="M17.273 24.025l6.97-3.961-6.97-3.969z" fill="#ff001d" />
    </svg>
  );
};

const InstagramSVG = () => {
  return (
    <svg
      className="h-10 w-10 bg-[#f07636]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      role="img"
      focusable="false"
    >
      <title>Instagram</title>
      <g transform="translate(-336 -285)">
        <path
          d="M356 294.069c3.56 0 3.982.014 5.388.078a7.38 7.38 0 012.476.459
          4.416 4.416 0 012.53 2.53 7.38 7.38 0 01.459 2.476c.064 1.406.078
          1.828.078 5.388s-.014 3.982-.078 5.388a7.38 7.38 0 01-.459 2.476 4.416
          4.416 0 01-2.53 2.53 7.38 7.38 0
          01-2.476.459c-1.406.064-1.827.078-5.388.078s-3.982-.014-5.388-.078a7.38
          7.38 0 01-2.476-.459 4.416 4.416 0 01-2.53-2.53 7.38 7.38 0
          01-.459-2.476c-.064-1.406-.078-1.828-.078-5.388s.014-3.982.078-5.388a7.38
          7.38 0 01.459-2.476 4.416 4.416 0 012.53-2.53 7.38 7.38 0 012.476-.459c1.406-.064
          1.828-.078 5.388-.078m0-2.4c-3.621 0-4.075.015-5.5.08a9.787 9.787 0 00-3.237.62
          6.818 6.818 0 00-3.9 3.9 9.787 9.787 0 00-.62 3.237c-.065 1.422-.08 1.876-.08
          5.5s.015 4.075.08 5.5a9.787 9.787 0 00.62 3.237 6.818 6.818 0 003.9 3.9
          9.787 9.787 0 003.237.62c1.422.065 1.876.08 5.5.08s4.075-.015 5.5-.08a9.787
          9.787 0 003.237-.62 6.818 6.818 0 003.9-3.9 9.787 9.787 0
          00.62-3.237c.065-1.422.08-1.876.08-5.5s-.015-4.075-.08-5.5a9.787 9.787
          0 00-.62-3.237 6.818 6.818 0 00-3.9-3.9 9.787 9.787 0
          00-3.237-.62c-1.422-.065-1.876-.08-5.5-.08z"
          fill="#fff"
        />
        <path
          d="M356 298.153a6.847 6.847 0 106.847 6.847 6.847 6.847 0 00-6.847-6.847zm0
          11.291a4.444 4.444 0 114.444-4.444 4.444 4.444 0 01-4.444 4.444z"
          fill="#fff"
        />
        <circle
          cx="1.6"
          cy="1.6"
          r="1.6"
          transform="translate(361.517 296.283)"
          fill="#fff"
        />
      </g>
    </svg>
  );
};

const countries = [
  "Afghanistan",
  "Åland Islands",
  "Albania",
  "Algeria",
  "American Samoa",
  "AndorrA",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Colombia",
  "Comoros",
  "Congo",
  "Congo, The Democratic Republic of the",
  "Cook Islands",
  "Costa Rica",
  "Cote D'Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands (Malvinas)",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and Mcdonald Islands",
  "Holy See (Vatican City State)",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran, Islamic Republic Of",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, Democratic People'S Republic of",
  "Korea, Republic of",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People'S Democratic Republic",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libyan Arab Jamahiriya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Macedonia, The Former Yugoslav Republic of",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia, Federated States of",
  "Moldova, Republic of",
  "Monaco",
  "Mongolia",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestinian Territory, Occupied",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russian Federation",
  "RWANDA",
  "Saint Helena",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia and Montenegro",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan, Province of China",
  "Tajikistan",
  "Tanzania, United Republic of",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "United States Minor Outlying Islands",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Viet Nam",
  "Virgin Islands, British",
  "Virgin Islands, U.S.",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const languages = [
  "Abkhaz",
  "Afar",
  "Afrikaans",
  "Akan",
  "Albanian",
  "Amharic",
  "Arabic",
  "Aragonese",
  "Armenian",
  "Assamese",
  "Avaric",
  "Avestan",
  "Aymara",
  "Azerbaijani",
  "Bambara",
  "Bashkir",
  "Basque",
  "Belarusian",
  "Bengali",
  "Bihari",
  "Bislama",
  "Bosnian",
  "Breton",
  "Bulgarian",
  "Burmese",
  "Catalan; Valencian",
  "Chamorro",
  "Chechen",
  "Chichewa; Chewa; Nyanja",
  "Chinese",
  "Chuvash",
  "Cornish",
  "Corsican",
  "Cree",
  "Croatian",
  "Czech",
  "Danish",
  "Divehi; Dhivehi; Maldivian;",
  "Dutch",
  "English",
  "Esperanto",
  "Estonian",
  "Ewe",
  "Faroese",
  "Fijian",
  "Finnish",
  "French",
  "Fula; Fulah; Pulaar; Pular",
  "Galician",
  "Georgian",
  "German",
  "Greek, Modern",
  "Guaraní",
  "Gujarati",
  "Haitian; Haitian Creole",
  "Hausa",
  "Hebrew (modern)",
  "Herero",
  "Hindi",
  "Hiri Motu",
  "Hungarian",
  "Interlingua",
  "Indonesian",
  "Interlingue",
  "Irish",
  "Igbo",
  "Inupiaq",
  "Ido",
  "Icelandic",
  "Italian",
  "Inuktitut",
  "Japanese",
  "Javanese",
  "Kalaallisut, Greenlandic",
  "Kannada",
  "Kanuri",
  "Kashmiri",
  "Kazakh",
  "Khmer",
  "Kikuyu, Gikuyu",
  "Kinyarwanda",
  "Kirghiz, Kyrgyz",
  "Komi",
  "Kongo",
  "Korean",
  "Kurdish",
  "Kwanyama, Kuanyama",
  "Latin",
  "Luxembourgish, Letzeburgesch",
  "Luganda",
  "Limburgish, Limburgan, Limburger",
  "Lingala",
  "Lao",
  "Lithuanian",
  "Luba-Katanga",
  "Latvian",
  "Manx",
  "Macedonian",
  "Malagasy",
  "Malay",
  "Malayalam",
  "Maltese",
  "Māori",
  "Marathi (Marāṭhī)",
  "Marshallese",
  "Mongolian",
  "Nauru",
  "Navajo, Navaho",
  "Norwegian Bokmål",
  "North Ndebele",
  "Nepali",
  "Ndonga",
  "Norwegian Nynorsk",
  "Norwegian",
  "Nuosu",
  "South Ndebele",
  "Occitan",
  "Ojibwe, Ojibwa",
  "Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic",
  "Oromo",
  "Oriya",
  "Ossetian, Ossetic",
  "Panjabi, Punjabi",
  "Pāli",
  "Persian",
  "Polish",
  "Pashto, Pushto",
  "Portuguese",
  "Quechua",
  "Romansh",
  "Kirundi",
  "Romanian, Moldavian, Moldovan",
  "Russian",
  "Sanskrit (Saṁskṛta)",
  "Sardinian",
  "Sindhi",
  "Northern Sami",
  "Samoan",
  "Sango",
  "Serbian",
  "Scottish Gaelic; Gaelic",
  "Shona",
  "Sinhala, Sinhalese",
  "Slovak",
  "Slovene",
  "Somali",
  "Southern Sotho",
  "Spanish; Castilian",
  "Sundanese",
  "Swahili",
  "Swati",
  "Swedish",
  "Tamil",
  "Telugu",
  "Tajik",
  "Thai",
  "Tigrinya",
  "Tibetan Standard, Tibetan, Central",
  "Turkmen",
  "Tagalog",
  "Tswana",
  "Tonga (Tonga Islands)",
  "Turkish",
  "Tsonga",
  "Tatar",
  "Twi",
  "Tahitian",
  "Uighur, Uyghur",
  "Ukrainian",
  "Urdu",
  "Uzbek",
  "Venda",
  "Vietnamese",
  "Volapük",
  "Walloon",
  "Welsh",
  "Wolof",
  "Western Frisian",
  "Xhosa",
  "Yiddish",
  "Yoruba",
  "Zhuang, Chuang",
];

export default AbletonFooter;
