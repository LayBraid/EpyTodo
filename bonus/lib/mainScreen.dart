import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:flutter/src/foundation/key.dart';
import 'package:flutter/src/widgets/framework.dart';

import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';

import 'getStatus.dart';
import 'getTodos.dart';
import 'statusRow.dart';

class ScreenArguments {
  final String title;
  final String message;
  final Function function;

  ScreenArguments({
    required this.title,
    required this.message,
    required this.function,
  });
}

enum Status {
  notStarted,
  todo,
  inProgress,
  done,
}

class Todo {
  final int id;
  final String title;
  final String description;
  final DateTime created_at;
  final DateTime due_time;
  late final Status status;
  final int user_id;

  Todo({
    required this.id,
    required this.title,
    required this.description,
    required this.created_at,
    required this.due_time,
    required this.status,
    required this.user_id,
  });
}

class MainScreen extends StatefulWidget {
  const MainScreen({
    Key? key,
    required this.title,
    required this.token,
  }) : super(key: key);
  final String title;
  final String token;

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  late List<Todo> todos;

  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context)!.settings.arguments as ScreenArguments;
    setState(() {
      fetchData(args.message);
    });
    // getTodos(widget.token);
    double rowWidth = (MediaQuery.of(context).size.width / 5);
    return Scaffold(
      appBar: AppBar(
        title: Text(args.title),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(25.0),
            child: Text(
              "EpyToDo",
              style: TextStyle(fontSize: 40),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 100.0),
            child: Row(
              children: [
                StatusRow(
                  title: "not started",
                  width: rowWidth,
                  token: args.message,
                  todos: todos,
                  status: Status.notStarted,
                  fetchFunc: fetchData,
                ),
                Spacer(),
                StatusRow(
                  title: "todo",
                  width: rowWidth,
                  token: args.message,
                  todos: todos,
                  status: Status.todo,
                  fetchFunc: fetchData,
                ),
                Spacer(),
                StatusRow(
                  title: "in progress",
                  width: rowWidth,
                  token: args.message,
                  todos: todos,
                  status: Status.inProgress,
                  fetchFunc: fetchData,
                ),
                Spacer(),
                StatusRow(
                  title: "done",
                  width: rowWidth,
                  token: args.message,
                  todos: todos,
                  status: Status.done,
                  fetchFunc: fetchData,
                ),
              ],
            ),
          ),
          Flexible(
            child: Padding(
              padding: const EdgeInsets.all(100.0),
              child: ElevatedButton(
                onPressed: (() {
                  Navigator.pushReplacementNamed(context, '/login');
                }),
                child: Text(
                  "Log out",
                  style: TextStyle(fontSize: 30),
                ),
              ),
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: (() {
          fetchData(args.message);
        }),
        child: const Icon(Icons.replay_outlined),
      ),
    );
  }

  void fetchData(String token) async {
    todos = await getTodos(token, context);
    setState(() {});
  }
}
