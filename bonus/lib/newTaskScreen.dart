import 'dart:convert';
import 'dart:io';

import 'package:intl/intl.dart';
import 'package:epytodo/mainScreen.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import 'getStatus.dart';
import 'inputfield.dart';
import 'main.dart';

class NewTaskScreen extends StatefulWidget {
  const NewTaskScreen({
    Key? key,
    required this.title,
  }) : super(key: key);
  final String title;

  @override
  State<NewTaskScreen> createState() => _NewTaskScreenState();
}

class _NewTaskScreenState extends State<NewTaskScreen> {
  DateTime dueTime = DateTime.now();
  TextEditingController titleController = TextEditingController();
  TextEditingController descriptionController = TextEditingController();
  Errors error = Errors.none;

  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context)!.settings.arguments as ScreenArguments;
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'Create a new ${args.title} task !',
              style: const TextStyle(fontSize: 40),
            ),
            const SizedBox(height: 50),
            InputField(
              controller: titleController,
              error: error,
              hint: "title",
              label: "Title",
            ),
            InputField(
              controller: descriptionController,
              error: error,
              hint: "description",
              label: "Description",
              height: 4,
            ),
            const SizedBox(height: 20),
            TextButton(
              onPressed: () async {
                dueTime = await showDatePicker(
                  context: context,
                  initialDate: DateTime.now(),
                  firstDate: DateTime.now(),
                  lastDate: DateTime(2025),
                  helpText: "Due time",
                ) as DateTime;
              },
              child: Text(
                DateFormat('yyyy-MM-dd hh:mm:ss').format(dueTime),
                style: TextStyle(fontSize: 20),
              ),
            ),
            const SizedBox(height: 40),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: SizedBox(
                width: 300,
                child: ElevatedButton(
                  onPressed: () {
                    addTodo(
                      args.message,
                      titleController.text,
                      descriptionController.text,
                      args.title,
                      dueTime,
                      args.function,
                    );
                  },
                  child: const Text("Create"),
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
          ],
        ),
      ),
    );
  }

  void checkEmptyFields() {
    return setState(() {
      if (titleController.text == "" || descriptionController.text == "") {
        error = Errors.incompleteForm;
      } else if (error == Errors.incompleteForm) {
        error = Errors.none;
      }
    });
  }

  void addTodo(token, title, description, page, dueTime, fetchFunc) async {
    checkEmptyFields();
    if (error == Errors.incompleteForm) {
      return;
    }
    print(page);
    String req = jsonEncode({
      'title': title,
      'description': description,
      'due_time': DateFormat('yyyy-MM-dd hh:mm:ss').format(dueTime),
      'user_id': 15,
      'status': page,
    });
    final http.Response res = await http.post(
      Uri.parse('http://localhost:3000/todos'),
      headers: {
        HttpHeaders.authorizationHeader: token,
        HttpHeaders.contentTypeHeader: 'application/json; charset=UTF-8'
      },
      body: req,
    );
    print(res.body);
    fetchFunc(token);
    Navigator.pop(context);
  }
}
