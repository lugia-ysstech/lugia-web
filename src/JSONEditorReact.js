import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';

import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

import './JSONEditorReact.css';

class JSONEditorReact extends Component {
  componentDidMount() {
    // copy all properties into options for the editor
    // (except the properties for the JSONEditorReact component itself)
    const options = Object.assign({}, this.props);
    delete options.json;
    delete options.text;

    this.jsoneditor = new JSONEditor(this.container, options);

    if ('json' in this.props) {
      this.jsoneditor.set(this.props.json);
    }
    if ('text' in this.props) {
      this.jsoneditor.setText(this.props.text);
    }
    this.schema = cloneDeep(this.props.schema);
    this.schemaRefs = cloneDeep(this.props.schemaRefs);
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    if ('json' in nextProps) {
      this.jsoneditor.update(nextProps.json);
    }

    if ('text' in nextProps) {
      this.jsoneditor.updateText(nextProps.text);
    }

    if ('mode' in nextProps) {
      this.jsoneditor.setMode(nextProps.mode);
    }

    // store a clone of the schema to keep track on when it actually changes.
    // (When using a PureComponent all of this would be redundant)
    const schemaChanged = !isEqual(nextProps.schema, this.schema);
    const schemaRefsChanged = !isEqual(nextProps.schemaRefs, this.schemaRefs);
    if (schemaChanged || schemaRefsChanged) {
      this.schema = cloneDeep(nextProps.schema);
      this.schemaRefs = cloneDeep(nextProps.schemaRefs);
      this.jsoneditor.setSchema(nextProps.schema, nextProps.schemaRefs);
    }
  }

  componentWillUnmount() {
    if (this.jsoneditor) {
      this.jsoneditor.destroy();
    }
  }

  render() {
    const { width = '100%', height = 200 } = this.props;
    const style = {
      width,
      height,
    };
    return <div style={style} ref={elem => (this.container = elem)} />;
  }
}

const schema = {};

const json = {
  normal: {},
  hover: {},
  disabled: {},
  clicked: {},
  children: {},
};

const modes = ['tree', 'code'];

class App extends Component {
  state = {
    schema,
    text: JSON.stringify(json, null, 2),
    mode: 'code',
  };

  render() {
    return (
      <JSONEditorReact
        schema={this.state.schema}
        text={this.state.text}
        mode={this.state.mode}
        modes={modes}
        indentation={4}
        onChangeText={this.onChangeText}
        onModeChange={this.onModeChange}
      />
    );
  }

  onChangeText = text => {
    const { onChange } = this.props;
    this.setState({ text });
    onChange && onChange(text);
  };

  onModeChange = mode => {
    this.setState({ mode });
  };
}

export default App;
