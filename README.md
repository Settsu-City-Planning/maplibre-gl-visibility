# maplibre-gl-visibility

maplibre-gl-visibilityは、[maplibre-gl-opacity](https://github.com/mug-jp/maplibre-gl-opacity)に[map-gl-utils](https://github.com/stevage/map-gl-utils)を適用して、複数のレイヤーの表示/非表示を一括で切り替えられるようにしたMapLibre GL JSのプラグインです。

### 例

```html
<link rel="stylesheet" href="./maplibre-gl-visibility.css">
```

```javascript
// module import
import VisibilityControl from './maplibre-gl-visibility.js';

// VisibilityControlのオプション

// 背景レイヤ設定では、Sourceのidを指定します。
    const mapBaseLayer = {
        SourceId1: 'Display Label 1',
        SourceId2: 'Display Label 2'
    };

// オーバーレイヤ設定はMapオブジェクトで、key[1]にfalsyでない値があれば初期チェック状態になります。
// valueには配列でレイヤを列挙できます。
    const mapOverLayer = new Map([
        [["Display Label 3", "+"], "layerId1"],
        [["Display Label 4"], ["layerId2", "layerId3"]]
    ]);

// VisibilityControl
let Visibility = new VisibilityControl({
    baseLayers: mapBaseLayer,
    overLayers: mapOverLayer,
// 透過度スライドバー表示/非表示設定 (trueまたはfalse)
    opacityControl: true,
});
map.addControl(Visibility, 'top-right');

```

以下、オリジナルのmaplibre-gl-opacityのREADMEです。

<br>

---

<br>

# maplibre-gl-opacity

maplibre-gl-opacity is a MapLibre GL JS plugin that makes multiple tile layers transparent.

[MapLibre GL JS Plugins](https://maplibre.org/maplibre-gl-js/docs/plugins)  
[npm](https://www.npmjs.com/package/maplibre-gl-opacity)  

<br>

## Usage

![maplibre-gl-opacity](./img/maplibre-gl-opacity.gif)

<br>

### Demo

[demo](https://mug-jp.github.io/maplibre-gl-opacity)

<br>

### Option

```javascript
// addControl Option

// The position of the control (one of the map corners).
position: 'top-left' or 'top-right' or 'bottom-left' or 'bottom-right'


// OpacityControl Option

// Baselayers settings
baseLayers: {
    m_mono: 'MIERUNE Mono',
    m_color: 'MIERUNE Color'
}

// Overlayers settings
overLayers: {
    o_std: 'OpenStreetMap',
    t_pale: 'GSI Pale',
    t_ort: 'GSI Ort'
}

// Transparent slide bar settings (true or false)
opacityControl: true
```

<br>

### Example

Start MapLibre GL JS easily. [MapLibre GL JS, Vite]  
[maplibregljs-starter](https://github.com/mug-jp/maplibregljs-starter)

Install package
```bash
npm install maplibre-gl-opacity
```

main.ts
```typescript
import './style.css'
import 'maplibre-gl/dist/maplibre-gl.css';
import 'maplibre-gl-opacity/dist/maplibre-gl-opacity.css';
import maplibregl from 'maplibre-gl';

// module import
import OpacityControl from 'maplibre-gl-opacity';

// MIERUNE MONO
let map = new maplibregl.Map({
    container: 'map',
    style: {
        version: 8,
        sources: {
            m_mono: {
                type: 'raster',
                tiles: ['https://tile.mierune.co.jp/mierune_mono/{z}/{x}/{y}.png'],
                tileSize: 256,
                attribution:
                    "Maptiles by <a href='http://mierune.co.jp/' target='_blank'>MIERUNE</a>, under CC BY. Data by <a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a> contributors, under ODbL.",
            },
        },
        layers: [
            {
                id: 'm_mono',
                type: 'raster',
                source: 'm_mono',
                minzoom: 0,
                maxzoom: 18,
            },
        ],
    },
    center: [139.767, 35.681],
    zoom: 10,
});

map.on('load', function () {
    // MIERUNE Color
    map.addSource('m_color', {
        type: 'raster',
        tiles: ['https://tile.mierune.co.jp/mierune/{z}/{x}/{y}.png'],
        tileSize: 256,
    });
    map.addLayer({
        id: 'm_color',
        type: 'raster',
        source: 'm_color',
        minzoom: 0,
        maxzoom: 18,
    });

    // OpenStreetMap
    map.addSource('o_std', {
        type: 'raster',
        tiles: [
            'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
            'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
        ],
        tileSize: 256,
    });
    map.addLayer({
        id: 'o_std',
        type: 'raster',
        source: 'o_std',
        minzoom: 0,
        maxzoom: 18,
    });

    // GSI Pale
    map.addSource('t_pale', {
        type: 'raster',
        tiles: ['https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png'],
        tileSize: 256,
    });
    map.addLayer({
        id: 't_pale',
        type: 'raster',
        source: 't_pale',
        minzoom: 0,
        maxzoom: 18,
    });

    // GSI Ort
    map.addSource('t_ort', {
        type: 'raster',
        tiles: ['https://cyberjapandata.gsi.go.jp/xyz/ort/{z}/{x}/{y}.jpg'],
        tileSize: 256,
    });
    map.addLayer({
        id: 't_ort',
        type: 'raster',
        source: 't_ort',
        minzoom: 0,
        maxzoom: 18,
    });

    // BaseLayer
    const mapBaseLayer = {
        m_mono: 'MIERUNE Mono',
        m_color: 'MIERUNE Color',
    };

    // OverLayer
    const mapOverLayer = {
        o_std: 'OpenStreetMap',
        t_pale: 'GSI Pale',
        t_ort: 'GSI Ort',
    };

    // OpacityControl
    let Opacity = new OpacityControl({
        baseLayers: mapBaseLayer,
        overLayers: mapOverLayer,
        opacityControl: true,
    });
    map.addControl(Opacity, 'top-right');

    // NavigationControl
    let nc = new maplibregl.NavigationControl();
    map.addControl(nc, 'top-left');
});
```

<br>

## License
MIT

Copyright (c) 2021-2024  Yasunori Kirimoto

<br>

---

<br>

### Japanese

<br>

# maplibre-gl-opacity

maplibre-gl-opacityは、複数のタイルレイヤーを透過するMapLibre GL JSのプラグインです。

[MapLibre GL JS Plugins](https://maplibre.org/maplibre-gl-js/docs/plugins)  
[npm](https://www.npmjs.com/package/maplibre-gl-opacity)  

<br>

## 使用方法

![maplibre-gl-opacity](./img/maplibre-gl-opacity.gif)

<br>

### デモ

[デモ](https://mug-jp.github.io/maplibre-gl-opacity)

<br>

### オプション

```javascript
// addControlのオプション

//コントロールの配置設定。(デフォルト:右上配置)
position: 'top-left' or 'top-right' or 'bottom-left' or 'bottom-right'


// OpacityControlのオプション

// 背景レイヤ設定
baseLayers: {
    m_mono: 'MIERUNE Mono',
    m_color: 'MIERUNE Color'
}

// オーバーレイヤ設定
overLayers: {
    o_std: 'OpenStreetMap',
    t_pale: 'GSI Pale',
    t_ort: 'GSI Ort'
}

// 透過度スライドバー表示/非表示設定 (trueまたはfalse)
opacityControl: true
```

<br>

### 例

MapLibre GL JSを手軽に始める [MapLibre GL JS, Vite]  
[maplibregljs-starter](https://github.com/mug-jp/maplibregljs-starter)

パッケージインストール
```bash
npm install maplibre-gl-opacity
```

main.ts
```typescript
import './style.css'
import 'maplibre-gl/dist/maplibre-gl.css';
import 'maplibre-gl-opacity/dist/maplibre-gl-opacity.css';
import maplibregl from 'maplibre-gl';

// module import
import OpacityControl from 'maplibre-gl-opacity';

// MIERUNE MONO
let map = new maplibregl.Map({
    container: 'map',
    style: {
        version: 8,
        sources: {
            m_mono: {
                type: 'raster',
                tiles: ['https://tile.mierune.co.jp/mierune_mono/{z}/{x}/{y}.png'],
                tileSize: 256,
                attribution:
                    "Maptiles by <a href='http://mierune.co.jp/' target='_blank'>MIERUNE</a>, under CC BY. Data by <a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a> contributors, under ODbL.",
            },
        },
        layers: [
            {
                id: 'm_mono',
                type: 'raster',
                source: 'm_mono',
                minzoom: 0,
                maxzoom: 18,
            },
        ],
    },
    center: [139.767, 35.681],
    zoom: 10,
});

map.on('load', function () {
    // MIERUNE Color
    map.addSource('m_color', {
        type: 'raster',
        tiles: ['https://tile.mierune.co.jp/mierune/{z}/{x}/{y}.png'],
        tileSize: 256,
    });
    map.addLayer({
        id: 'm_color',
        type: 'raster',
        source: 'm_color',
        minzoom: 0,
        maxzoom: 18,
    });

    // OpenStreetMap
    map.addSource('o_std', {
        type: 'raster',
        tiles: [
            'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
            'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
        ],
        tileSize: 256,
    });
    map.addLayer({
        id: 'o_std',
        type: 'raster',
        source: 'o_std',
        minzoom: 0,
        maxzoom: 18,
    });

    // GSI Pale
    map.addSource('t_pale', {
        type: 'raster',
        tiles: ['https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png'],
        tileSize: 256,
    });
    map.addLayer({
        id: 't_pale',
        type: 'raster',
        source: 't_pale',
        minzoom: 0,
        maxzoom: 18,
    });

    // GSI Ort
    map.addSource('t_ort', {
        type: 'raster',
        tiles: ['https://cyberjapandata.gsi.go.jp/xyz/ort/{z}/{x}/{y}.jpg'],
        tileSize: 256,
    });
    map.addLayer({
        id: 't_ort',
        type: 'raster',
        source: 't_ort',
        minzoom: 0,
        maxzoom: 18,
    });

    // BaseLayer
    const mapBaseLayer = {
        m_mono: 'MIERUNE Mono',
        m_color: 'MIERUNE Color',
    };

    // OverLayer
    const mapOverLayer = {
        o_std: 'OpenStreetMap',
        t_pale: 'GSI Pale',
        t_ort: 'GSI Ort',
    };

    // OpacityControl
    let Opacity = new OpacityControl({
        baseLayers: mapBaseLayer,
        overLayers: mapOverLayer,
        opacityControl: true,
    });
    map.addControl(Opacity, 'top-right');

    // NavigationControl
    let nc = new maplibregl.NavigationControl();
    map.addControl(nc, 'top-left');
});
```

<br>

## ライセンス
MIT

Copyright (c) 2021-2024 Yasunori Kirimoto

<br>