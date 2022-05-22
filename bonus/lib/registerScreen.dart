import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import 'inputfield.dart';
import 'main.dart';
import 'mainScreen.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({Key? key, required this.title}) : super(key: key);
  final String title;

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  TextEditingController firstNameController = TextEditingController();
  TextEditingController nameController = TextEditingController();
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
              'Welcome !',
              style: TextStyle(fontSize: 40),
            ),
            const SizedBox(height: 50),
            InputField(
              controller: firstNameController,
              error: error,
              hint: "firstname",
              label: "First name",
            ),
            InputField(
              controller: nameController,
              error: error,
              hint: "name",
              label: "Name",
            ),
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
                  child: const Text("Register"),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: SizedBox(
                child: error != Errors.badRequest
                    ? null
                    : Text(
                        "Account already exists !",
                        style: TextStyle(color: Theme.of(context).errorColor),
                      ),
              ),
            ),
            const SizedBox(height: 40),
            SizedBox(
              width: 300,
              child: TextButton(
                onPressed: () {
                  Navigator.pushReplacementNamed(context, '/login');
                },
                child: const Text("Existing account ? Login instead"),
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
    String req = jsonEncode({
      'email': emailController.text,
      'password': passwordController.text,
      'firstname': firstNameController.text,
      'name': nameController.text
    });
    final http.Response res =
        await http.post(Uri.parse('http://localhost:3000/register'),
            headers: <String, String>{
              'Content-Type': 'application/json; charset=UTF-8',
            },
            body: req);
    setState(() {
      switch (res.statusCode) {
        case 200:
          Map<String, dynamic> resJson = jsonDecode(res.body);
          Navigator.pushReplacementNamed(context, '/main',
              arguments: ScreenArguments(
                title: 'EpyToDo',
                message: resJson['token'],
                function: () {},
              ));
          error = Errors.none;
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
          emailController.text == "" ||
          firstNameController.text == "" ||
          nameController.text == "") {
        error = Errors.incompleteForm;
      } else if (error == Errors.incompleteForm) {
        error = Errors.none;
      }
    });
  }
}
