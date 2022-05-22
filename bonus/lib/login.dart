import 'dart:convert';

import 'package:http/http.dart' as http;

Future<http.Response> login(email, password) async {
  String req = jsonEncode({
    'email': email,
    'password': password,
  });
  final http.Response res = await http.post(
    Uri.parse('http://localhost:3000/login'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: req,
  );
  return res;
}
