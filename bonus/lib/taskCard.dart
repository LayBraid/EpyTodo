import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
import 'getStatus.dart';
import 'mainScreen.dart';

class TaskCard extends StatefulWidget {
  final Todo task;
  final String token;
  final Function fetchFunc;

  TaskCard(this.task, this.token, this.fetchFunc);

  @override
  State<TaskCard> createState() => _TaskCardState();
}

class _TaskCardState extends State<TaskCard> {
  @override
  Widget build(BuildContext context) {
    final height = (MediaQuery.of(context).size.height);
    return Card(
      color: Theme.of(context).primaryColor,
      child: height < 600
          ? Text(widget.task.title)
          : Column(
              children: [
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Text(
                    widget.task.title,
                    style: const TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Text(
                    widget.task.description,
                    style: const TextStyle(fontStyle: FontStyle.italic),
                  ),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    IconButton(
                      onPressed: () {
                        setState(
                          () {
                            moveTask(
                                widget.task.id,
                                widget.token,
                                widget.task,
                                decrementStatus(widget.task.status),
                                widget.fetchFunc);
                          },
                        );
                      },
                      icon: const Icon(
                        Icons.navigate_before,
                        color: Colors.white,
                      ),
                    ),
                    IconButton(
                      onPressed: () {
                        setState(
                          () {
                            deleteTask(
                              widget.task.id,
                              widget.token,
                              widget.fetchFunc,
                            );
                          },
                        );
                      },
                      icon: const Icon(
                        Icons.delete_forever,
                        color: Colors.white,
                      ),
                    ),
                    IconButton(
                      onPressed: () {
                        setState(
                          () {
                            moveTask(
                              widget.task.id,
                              widget.token,
                              widget.task,
                              incrementStatus(
                                widget.task.status,
                              ),
                              widget.fetchFunc,
                            );
                          },
                        );
                      },
                      icon: const Icon(
                        Icons.navigate_next,
                        color: Colors.white,
                      ),
                    ),
                  ],
                ),
              ],
            ),
    );
  }

  void moveTask(
    int id,
    String token,
    Todo task,
    Status status,
    Function fetchFunc,
  ) async {
    String req = jsonEncode(
      {
        'title': task.title,
        'description': task.description,
        'due_time': DateFormat('yyyy-MM-dd hh:mm:ss').format(task.due_time),
        'user_id': task.user_id,
        'status': putStatus(status),
      },
    );
    final http.Response res = await http.put(
      Uri.parse('http://localhost:3000/todos/$id'),
      headers: {
        HttpHeaders.authorizationHeader: token,
        HttpHeaders.contentTypeHeader: 'application/json'
      },
      body: req,
    );
    fetchFunc(token);
  }

  void deleteTask(int id, String token, Function fetchFunc) async {
    final http.Response res = await http.delete(
      Uri.parse('http://localhost:3000/todos/$id'),
      headers: {
        HttpHeaders.authorizationHeader: token,
      },
    );
    fetchFunc(token);
  }
}
