import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import Theme from '../config/Theme';

export const ButtonLink = ({
  children,
  onClick,
  disabled,
  primary = true,
  style,
  ...props
}) => (
  <TouchableOpacity disabled={disabled} onPress={onClick} {...props}>
    <Text style={[styles.btnLink, disabled && styles.btnLinkDisabled, style]}>
      {children}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btnLink: {
    color: Theme.primary,
    fontWeight: 'bold',
  },
  btnLinkDisabled: {
    color: Theme.textDisabled,
  },
});

export default ButtonLink;
