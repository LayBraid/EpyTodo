import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

Future<int> getUserId(String token) async {
  final http.Response res = await http.get(
    Uri.parse('http://localhost:3000/user'),
    headers: {
      HttpHeaders.authorizationHeader: token,
    },
  );
  Map<String, dynamic> resJson = jsonDecode(res.body)[0];
  return resJson['id'] as int;
}
