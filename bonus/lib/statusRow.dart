import 'dart:convert';
import 'dart:io';

import 'package:epytodo/getStatus.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';

import 'getTodos.dart';
import 'mainScreen.dart';
import 'taskCard.dart';

class StatusRow extends StatefulWidget {
  const StatusRow({
    Key? key,
    required this.title,
    required this.width,
    required this.token,
    required this.status,
    required this.todos,
    required this.fetchFunc,
  }) : super(key: key);
  final String title;
  final double width;
  final String token;
  final Status status;
  final List<Todo> todos;
  final void Function(String) fetchFunc;

  @override
  State<StatusRow> createState() => _StatusRowState();
}

class _StatusRowState extends State<StatusRow> {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: widget.width,
      height: (MediaQuery.of(context).size.height / 2),
      decoration: BoxDecoration(
        border: Border.all(
          width: 1,
          color: Colors.black,
        ),
        borderRadius: const BorderRadius.all(Radius.circular(4)),
      ),
      padding: const EdgeInsets.all(8.0),
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(
              widget.title,
              style: TextStyle(fontSize: widget.width / 8),
            ),
          ),
          const Divider(),
          const SizedBox(
            height: 20,
          ),
          SingleChildScrollView(
            child: Column(
              children: List.generate(
                statusLength(widget.todos, widget.status),
                (index) {
                  while (widget.todos[index].status != widget.status) {
                    index++;
                  }
                  return TaskCard(
                    widget.todos[index],
                    widget.token,
                    widget.fetchFunc,
                  );
                },
              ),
            ),
          ),
          const Spacer(),
          Padding(
            padding: const EdgeInsets.all(10.0),
            child: FloatingActionButton(
              onPressed: () => Navigator.pushNamed(
                context,
                '/newtask',
                arguments: ScreenArguments(
                  title: widget.title,
                  message: widget.token,
                  function: widget.fetchFunc,
                ),
              ),
              tooltip: "Add new task",
              child: const Icon(Icons.add),
            ),
          ),
        ],
      ),
    );
  }

  int statusLength(list, status) {
    int count = 0;
    for (int i = 0; i < list.length; i++) {
      if (list[i].status == status) count++;
    }
    return count;
  }
}
