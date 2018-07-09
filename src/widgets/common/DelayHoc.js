import * as React from 'react';
export default WrappedComponent =>
  class HOC extends React.Component {
    static getDerivedStateFromProps(nextProps, prevState) {
      const { loading } = nextProps;
      if (!prevState) {
        return {
          isLoading: false,
          loading: !!nextProps.loading,
        };
      }
      if (prevState && prevState.isLoading) {
        if (typeof loading === 'object') {
          return {
            loading: false,
          };
        }
      }
      if (typeof loading === 'boolean') {
        return {
          loading,
        };
      }
    }

    componentDidMount() {
      const { loading } = this.props;
      if (typeof loading === 'object') {
        const { delay } = loading;
        if (delay && typeof delay === 'number') {
          setTimeout(() => {
            this.setState({
              isLoading: true,
            });
          }, delay);
        }
      }
    }

    render() {
      const { loading } = this.state;
      return <WrappedComponent {...this.props} loading={loading} />;
    }
  };
