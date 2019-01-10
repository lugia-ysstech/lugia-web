/*
 * by wangcuixia
 * @flow
 * */
import React, { Component } from 'react';
import { LoadingWrapper, getUrl } from './styled';
type TypeProps = {
  loading?: boolean,
  time?: number,
};
type TypeState = {
  imageUrl?: string,
};
class PageLoading extends Component<TypeProps, TypeState> {
  constructor() {
    super();
    this.state = {
      imageUrl: '',
    };
  }
  componentDidMount() {
    const { time = 3, loading = false } = this.props;
    const newTime = time * 1000;
    loading &&
      getUrl(newTime, url => {
        this.setState({ imageUrl: url });
      });
  }
  render() {
    const { imageUrl } = this.state;
    return <LoadingWrapper url={imageUrl} />;
  }
}

export default PageLoading;
