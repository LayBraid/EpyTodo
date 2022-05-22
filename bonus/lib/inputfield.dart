import 'package:epytodo/main.dart';
import 'package:flutter/material.dart';

class InputField extends StatelessWidget {
  TextEditingController controller;
  String label;
  String hint;
  Errors error;
  bool cover;
  int height;

  InputField({
    required this.controller,
    required this.label,
    required this.hint,
    required this.error,
    this.cover = false,
    this.height = 1,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: SizedBox(
        width: 300,
        child: TextField(
          minLines: height,
          maxLines: height,
          obscureText: cover,
          controller: controller,
          decoration: InputDecoration(
            hintText: hint,
            labelText: label,
            errorText: error != Errors.incompleteForm
                ? null
                : controller.text != ""
                    ? null
                    : "Do not leave the $label blank !",
          ),
          textAlign: TextAlign.center,
        ),
      ),
    );
  }
}
