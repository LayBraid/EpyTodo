import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'getStatus.dart';
import 'login.dart';
import 'mainScreen.dart';

Future<List<Todo>> getTodos(token, context) async {
  final http.Response res = await http.get(
    Uri.parse('http://localhost:3000/user/todos'),
    headers: {HttpHeaders.authorizationHeader: token},
  );
  if (res.statusCode == 401) {
    Navigator.pushReplacementNamed(context, '/login',
        arguments:
            ScreenArguments(title: 'Login', message: token, function: () {}));
  }
  List<dynamic> resJson = jsonDecode(res.body);
  List<Todo> todos = List.generate(resJson.length, (index) {
    return Todo(
      id: resJson[index]['id'],
      title: resJson[index]['title'],
      description: resJson[index]['description'],
      created_at: DateTime.parse(resJson[index]['created_at']),
      due_time: DateTime.parse(resJson[index]['due_time']),
      status: getStatus(resJson[index]['status']),
      user_id: resJson[index]['user_id'],
    );
  });
  print("success");
  return todos;
}
