const width = 800;
const height = 400;

const cx = width / 2;
const cy = height / 2;

const radius = 8;
const size = 4 * radius * radius;
const collide = 1;
const gravityX = 0.2;
const gravityY = 0.1;
const static = true;

let spec = {
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "width": width,
  "height": height,
  "padding": {"left": 5, "right": 5, "top": 0, "bottom": 20},
  "autosize": "none",

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
      "name": "color",
      "type": "ordinal",
      "domain": {"data": "people", "field": "party"},
      "range": {"scheme": "category20c"}
    }
  ],

  "axes": [
    { "orient": "bottom", "scale": "xscale" }
  ],

  "marks": [
    {
      "name": "nodes",
      "type": "symbol",
      "from": {"data": "people"},
      "encode": {
        "enter": {
          "fill": {"scale": "color", "field": "party"},
          "xfocus": {"scale": "xscale", "field": "vote", "band": 0.5},
          "yfocus": {"value": cy}
        },
        "update": {
          "size": {"value": size},
          "stroke": {"value": "white"},
          "strokeWidth": {"value": 1},
          "zindex": {"value": 0}
        },
        "hover": {
          "stroke": {"value": "purple"},
          "strokeWidth": {"value": 3},
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