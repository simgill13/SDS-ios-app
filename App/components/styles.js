import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    height: 50,
  },
  back: {
    color: '#444444',
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  title: {
    color: "#444444",
    fontSize: 20,
    fontWeight:'200',
  },
  inputWrap: {
    flexDirection: 'row',
    marginVertical: 10,
    height: 60,
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
  },
  textInput: {
    flex:1,
    alignItems: 'center',
    textAlign: 'left',
    color: '#222222',
    padding: 10,
    margin: 5,
    borderColor: "rgba(255,255,255,.8)",
    borderWidth: 1,
    borderRadius: 3,
  },
  label: {
    margin: 10,
    flex: 1,
    color: '#60b7e2',
  },
  button: {
    backgroundColor: "rgba(255,255,255,.3)",
    flex: 1,
    borderColor: '#ffffff',
    margin: 5,
    borderRadius: 12,
    borderColor: "rgba(255,255,255,.8)",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  cameraIcon: {
    margin: 7.5,
  },
  photoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});

export default styles
