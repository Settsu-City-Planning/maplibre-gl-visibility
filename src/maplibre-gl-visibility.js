import U from 'map-gl-utils';

// デフォルトオプション設定
const defaultOptions = {
    baseLayers: null,
    overLayers: null,
    opacityControl: false,
};

class VisibilityControl {
    #map;
    #container;
    #baseLayersOption;
    #overLayersOption;
    #opacityControlOption;

    constructor(options) {
        // オプション設定
        this.#baseLayersOption = options.baseLayers || defaultOptions.baseLayers;
        this.#overLayersOption = options.overLayers || defaultOptions.overLayers;
        this.#opacityControlOption = options.opacityControl || defaultOptions.opacityControl;
    }

    // ラジオボタン作成
    #radioButtonControlAdd(sourceId) {
        // 初期レイヤ定義
        const initLayer = Object.keys(this.#baseLayersOption)[0];
        // ラジオボタン追加
        const radioButton = document.createElement('input');
        radioButton.setAttribute('type', 'radio');
        radioButton.id = sourceId;
        // 初期レイヤのみ表示
        if (sourceId === initLayer) {
            radioButton.checked = true;
            this.#map.U.show(layer => layer.source === sourceId);
        } else {
            this.#map.U.hide(layer => layer.source === sourceId);
        }
        this.#container.appendChild(radioButton);
        // ラジオボタンイベント
        radioButton.addEventListener('change', (event) => {
            // 選択レイヤ表示
            event.target.checked = true;
            this.#map.U.show(layer => layer.source === sourceId);
            // 選択レイヤ以外非表示
            Object.keys(this.#baseLayersOption).map((source) => {
                if (source !== event.target.id) {
                    document.getElementById(source).checked = false;
                    this.#map.U.hide(layer => layer.source === source);
                }
            });
        });
        // レイヤ名追加
        const sourceName = document.createElement('label');
        sourceName.htmlFor = sourceId;
        sourceName.appendChild(document.createTextNode(this.#baseLayersOption[sourceId]));
        this.#container.appendChild(sourceName);
    }

    // チェックボックス作成
    #checkBoxControlAdd(value, key) {
        // チェックボックス追加
        const checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');
        checkBox.id = key[0].replace(" ", "_");
        // 初期レイヤのみ表示
        if (key[1]) {
            checkBox.checked = true;
            this.#map.U.show(value);
        } else {
            this.#map.U.hide(value);
        }
        this.#container.appendChild(checkBox);
        // チェックボックスイベント
        checkBox.addEventListener('change', (event) => {
            // レイヤの表示・非表示
            if (event.target.checked) {
                this.#map.U.show(value);
            } else {
                this.#map.U.hide(value);
            }
        });
        // レイヤ名追加
        const layersName = document.createElement('label');
        layersName.htmlFor = checkBox.id;
        layersName.appendChild(document.createTextNode(key[0]));
        this.#container.appendChild(layersName);
    }

    // スライドバー作成
    #rangeControlAdd(value) {
        // スライドバー追加
        const range = document.createElement('input');
        range.type = 'range';
        range.min = 0;
        range.max = 100;
        range.value = 100;
        this.#container.appendChild(range);
        // スライドバーイベント
        range.addEventListener('input', (event) => {
            // 透過度設定
            this.#map.U.setLineOpacity(value, Number(event.target.value / 100));
        });
    }

    // コントロール作成
    #visibilityControlAdd() {
        // コントロール設定
        this.#container = document.createElement('div');
        this.#container.className = 'maplibregl-ctrl maplibregl-ctrl-group';
        this.#container.id = 'visibility-control';
        // 背景レイヤ設定
        if (this.#baseLayersOption) {
            Object.keys(this.#baseLayersOption).map((source) => {
                const sourceId = source;
                const br = document.createElement('br');
                // ラジオボタン作成
                this.#radioButtonControlAdd(sourceId);
                this.#container.appendChild(br);
            });
        }
        // 区切り線
        if (this.#baseLayersOption && this.#overLayersOption) {
            const hr = document.createElement('hr');
            this.#container.appendChild(hr);
        }
        // オーバーレイヤ設定
        if (this.#overLayersOption) {
            this.#overLayersOption.forEach((value, key) => {
                const br = document.createElement('br');
                // チェックボックス作成
                this.#checkBoxControlAdd(value, key);
                this.#container.appendChild(br);
                // スライドバー作成
                if (this.#opacityControlOption) {
                    this.#rangeControlAdd(value);
                    this.#container.appendChild(br);
                }
            });
        }
    }

    onAdd(map) {
        this.#map = map;
        // コントロール作成
        this.#visibilityControlAdd();
        return this.#container;
    }

    onRemove() {
        this.#container.parentNode.removeChild(this.#container);
        this.#map = null;
    }
}

export default VisibilityControl;
