import 'dart:convert';

import 'package:epytodo/mainScreen.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import 'inputfield.dart';
import 'login.dart';
import 'main.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({
    Key? key,
    required this.title,
  }) : super(key: key);
  final String title;

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  Errors error = Errors.none;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'Welcome back !',
              style: TextStyle(fontSize: 40),
            ),
            const SizedBox(height: 50),
            InputField(
              controller: emailController,
              error: error,
              hint: "firstname.name@email.com",
              label: "Email",
            ),
            InputField(
              controller: passwordController,
              error: error,
              hint: "password",
              label: "Password",
              cover: true,
            ),
            const SizedBox(height: 20),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: SizedBox(
                width: 300,
                child: ElevatedButton(
                  onPressed: signUp,
                  child: const Text("Login"),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: SizedBox(
                child: error != Errors.badRequest
                    ? null
                    : Text(
                        "Invalid login details !",
                        style: TextStyle(color: Theme.of(context).errorColor),
                      ),
              ),
            ),
            const SizedBox(height: 40),
            SizedBox(
              width: 300,
              child: TextButton(
                onPressed: () {
                  Navigator.pushReplacementNamed(context, '/register');
                },
                child: const Text("New user? Sign up instead"),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void signUp() async {
    checkEmptyFields();
    if (error == Errors.incompleteForm) return;
    http.Response res =
        await login(emailController.text, passwordController.text);
    setState(() {
      switch (res.statusCode) {
        case 200:
          error = Errors.none;
          Map<String, dynamic> resJson = jsonDecode(res.body);
          Navigator.pushReplacementNamed(context, '/main',
              arguments: ScreenArguments(
                  title: 'EpyToDo',
                  message: resJson['token'],
                  function: () {}));
          break;
        case 400:
          error = Errors.badRequest;
          break;
        default:
          error = Errors.none;
      }
    });
  }

  void checkEmptyFields() {
    return setState(() {
      if (emailController.text == "" ||
          passwordController.text == "" ||
          emailController.text == "") {
        error = Errors.incompleteForm;
      } else if (error == Errors.incompleteForm) {
        error = Errors.none;
      }
    });
  }
}
