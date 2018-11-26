/**
 *
 * create by lianggd
 *
 * @flow
 */
import React from 'react';
import renderer from 'react-test-renderer';
import Wrapper from '../demo';
import { _Step } from '../step';
import 'jest-styled-components';
import { getStepColor, getStepBackgroundColor } from '../../css/steps';
import colorsFunc from '../../css/stateColor';
import type { StepStatus } from '../../css/steps';
import changeColor from '../../css/utilsColor';
const {
  themeColor,
  blackColor,
  successColor,
  lightGreyColor,
  dangerColor,
  defaultColor,
} = colorsFunc();
const lightThemeColor = changeColor(themeColor, 20).rgb;

describe('stepsDemo', () => {
  it('Component JSON', () => {
    const renders = renderer.create(<Wrapper />);
    expect(renders.toJSON()).toMatchSnapshot();
  });

  function TestgetStepValue(stepNumber: number, status: StepStatus, exceptNumber: number) {
    it('getIcon', () => {
      expect(_Step.prototype.getStepValue(stepNumber, status)).toBe(exceptNumber);
    });
  }
  TestgetStepValue(3, 'finish', 3);
  TestgetStepValue(2, 'process', 2);
  TestgetStepValue(1, 'wait', 0);
  TestgetStepValue(0, 'process', 0);
  TestgetStepValue(1, 'process', 1);
  function TestgetIcon(status: StepStatus, exceptIcon: string) {
    it('getIcon', () => {
      expect(_Step.prototype.getIcon(status)).toBe(exceptIcon);
    });
  }
  TestgetIcon('finish', 'lugia-icon-reminder_check');
  TestgetIcon('process', '');
  TestgetIcon('next', '');
  TestgetIcon('error', 'lugia-icon-reminder_close');

  function testGetStepColor(props: Object, exceptColor) {
    it('getStepColor', () => {
      expect(getStepColor(props)).toBe(exceptColor);
    });
  }
  testGetStepColor({ stepStatus: 'finish', stepType: 'simple' }, successColor);
  testGetStepColor({ stepStatus: 'finish', stepType: 'flat' }, lightThemeColor);
  testGetStepColor({ stepStatus: 'finish', stepType: 'dot' }, successColor);
  testGetStepColor({ stepStatus: 'process', stepType: 'flat' }, lightThemeColor);
  testGetStepColor({ stepStatus: 'next', stepType: 'simple' }, themeColor);
  testGetStepColor({ stepStatus: 'error', stepType: 'simple' }, dangerColor);
  function testGetStepBackgroundColor(props: Object, exceptColor) {
    it('getStepBackgroundColor', () => {
      expect(getStepBackgroundColor(props)).toBe(exceptColor);
    });
  }
  testGetStepBackgroundColor({ stepStatus: 'finish', stepType: 'simple' }, defaultColor);
  testGetStepBackgroundColor({ stepStatus: 'finish', stepType: 'flat' }, lightThemeColor);
  testGetStepBackgroundColor({ stepStatus: 'process', stepType: 'flat' }, lightThemeColor);
  testGetStepBackgroundColor({ stepStatus: 'next', stepType: 'simple' }, defaultColor);
  testGetStepBackgroundColor({ stepStatus: 'error', stepType: 'flat' }, dangerColor);
  testGetStepBackgroundColor({ stepStatus: 'error', stepType: 'simple' }, defaultColor);
});
