import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import 'inputfield.dart';
import 'loginScreen.dart';
import 'mainScreen.dart';
import 'newTaskScreen.dart';
import 'registerScreen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      initialRoute: '/register',
      routes: {
        '/register': (context) => const RegisterScreen(title: 'Register'),
        '/login': (context) => const LoginScreen(title: 'Login'),
        '/newtask': (context) => const NewTaskScreen(title: 'New Task'),
        '/main': (context) => const MainScreen(
              title: 'EpyToDo',
              token: '',
            ),
      },
    );
  }
}

enum Errors { none, incompleteForm, badRequest }
