import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from 'react-native';
import Theme from '../config/Theme';

export const Button = ({
  children,
  onClick,
  disabled,
  loading,
  small,
  primary = false,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      disabled={disabled}
      {...props}
      style={[
        styles.btnBase,
        primary ? styles.btnPrimary : styles.btnSecondary,
        style,
        small ? styles.btnSmall : null,
        disabled && styles.btnDisabled,
      ]}>
      <Text style={primary ? styles.btnPrimaryText : styles.btnSecondaryText}>
        {loading ? <ActivityIndicator animating={loading} /> : children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnBase: {
    width: '100%',
    marginTop: 12,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPrimary: {
    backgroundColor: Theme.primary,
  },
  btnDisabled: {
    backgroundColor: Theme.gray,
  },
  btnSmall: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  btnPrimaryText: {
    color: Theme.secondary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnSecondary: {
    backgroundColor: Theme.gray,
  },
  btnSecondaryText: {
    color: Theme.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Button;
