import 'mainScreen.dart';

Status getStatus(string) {
  switch (string) {
    case 'not started':
      return Status.notStarted;
    case 'todo':
      return Status.todo;
    case 'in progress':
      return Status.inProgress;
    case 'done':
      return Status.done;
    default:
      return Status.notStarted;
  }
}

String putStatus(Status status) {
  switch (status) {
    case Status.notStarted:
      return 'not started';
    case Status.todo:
      return 'todo';
    case Status.inProgress:
      return 'in progress';
    case Status.done:
      return 'done';
    default:
      return 'not started';
  }
}

Status incrementStatus(Status status) {
  switch (status) {
    case Status.notStarted:
      return Status.todo;
    case Status.todo:
      return Status.inProgress;
    case Status.inProgress:
      return Status.done;
    case Status.done:
      return Status.notStarted;
    default:
      return Status.notStarted;
  }
}

Status decrementStatus(Status status) {
  switch (status) {
    case Status.notStarted:
      return Status.done;
    case Status.todo:
      return Status.notStarted;
    case Status.inProgress:
      return Status.todo;
    case Status.done:
      return Status.inProgress;
    default:
      return Status.notStarted;
  }
}
