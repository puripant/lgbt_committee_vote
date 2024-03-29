const width = 1000;
const height = 400;

const cx = width / 2;
const cy = height / 2;

const radius = 8;
const size = 3 * radius * radius;
const collide = 2;
const gravityX = 1;
const gravityY = 0.5;
const static = true;

let spec = {
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "width": width,
  "height": height,
  "padding": {"left": 5, "right": 5, "top": 0, "bottom": 20},
  "autosize": "none",
  "config": {
    "style": { "cell": { "stroke": "transparent" } },
    "axis": { "labelFont": "Noto Sans Thai UI", "titleFont": "Noto Sans Thai UI", "titlePadding": 15 },
    "text": { "font": "Noto Sans Thai UI" }
  },

  "data": [
    {
      "name": "people",
      "url": "data.csv",
      "format": { "type": "csv" }
    }
  ],

  "scales": [
    {
      "name": "xscale",
      "type": "band",
      "domain": {
        "data": "people",
        "field": "vote",
        "sort": true
      },
      "range": "width"
    },
    {
      "name": "yscale",
      "type": "band",
      "domain": {
        "data": "people",
        "field": "party",
        "sort": true,
      },
      "range": "height",
      "reverse": true
    },
    {
      "name": "color",
      "type": "ordinal",
      "domain": ["เพื่อไทย", "อนาคตใหม่", "พลังประชารัฐ", "ประชาธิปัตย์", "ประชาชาติ","ภูมิใจไทย","พลังท้องถิ่นไท","รวมพลังประชาชาติไทย","พลังไทยรักไทย","ชาติไทยพัฒนา","ชาติพัฒนา","รักษ์ผืนป่าประเทศไทย","พลังชาติไทย","เสรีรวมไทย","พลังปวงชนไทย","เศรษฐกิจใหม่","ครูไทยเพื่อประชาชน","เพื่อชาติ","ประชาธรรมไทย","ประชาชนปฏิรูป","ไทยศรีวิไลย์","ประชานิยม","พลังธรรมใหม่","พลเมืองไทย","ประชาภิวัฒน์","ประชาธิปไตยใหม่",],
      "range": ["red", "orange", "blue", "lightblue", "gray","gray","gray","gray","gray","gray","gray","gray","gray","gray","gray","gray","gray","gray","gray","gray","gray","gray","gray","gray","gray","gray"]
    }
  ],

  "axes": [
    { "orient": "bottom", "scale": "xscale", "labels": true },
    // { "orient": "left", "scale": "yscale", "labels": true }
  ],

  "marks": [
    {
      "name": "nodes",
      "type": "symbol",
      "from": {"data": "people"},
      "encode": {
        "enter": {
          "size": {"value": size},
          "fill": {"scale": "color", "field": "party"},
          "xfocus": {"scale": "xscale", "field": "vote", "band": 0.5},
          "yfocus": {"value": cy},
          // "yfocus": {"scale": "yscale", "field": "party", "band": 0.5},
          "tooltip": {"signal": "datum.first_name + ' ' + datum.last_name + ' (พรรค' + datum.party + ')'"}
        },
        "update": {
          "stroke": {"value": "white"},
          "strokeWidth": {"value": 0},
          "zindex": {"value": 0}
        },
        "hover": {
          "stroke": {"value": "black"},
          "strokeWidth": {"value": 2},
          "zindex": {"value": 1}
        }
      },
      "transform": [
        {
          "type": "force",
          "iterations": 300,
          "static": static,
          "forces": [
            { "force": "collide", "iterations": collide, "radius": radius },
            { "force": "x", "x": "xfocus", "strength": gravityX },
            { "force": "y", "y": "yfocus", "strength": gravityY }
          ]
        }
      ]
    }
  ]
};
let opt = { 
  actions: {
    export: true,
    source: false,
    compiled: false,
    editor: false
  },
  i18n: {
    PNG_ACTION: "บันทึกเป็น PNG",
    SVG_ACTION: "บันทึกเป็น SVG"
  },
  renderer: "canvas",
  scaleFactor: 2,
  downloadFileName: "vis"
};

vegaEmbed('#vis', spec, opt);