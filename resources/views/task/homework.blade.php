@extends('layouts.main')
@section('main.title', env('APP_NAME').' | Зроблені завдання')

@section('main.content')

<div class="container">
    <a class="text-decoration-none" href="{{ route('admin.index') }}">Назад</a>
    <h1 class="py-3">Заявки на реєстрацію</h1>

    <table class="table table-primary">
        <thead>
            <tr>
                <th scope="col">user</th>
                <th scope="col">task</th>
                <th scope="col">percentage</th>
                <th scope="col">actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($completedTasks as $task)
                <tr>
                    <th scope="row">{{ $task->user->name }}</th>
                    <td>{{ $task->task->name }}</td>
                    <td>{{ $task->percentage }}%</td>
                    <td><a href="{{ route('task.completed', [$task->user->id, $task->task->lesson->course->id, $task->task->lesson->id, $task->task->id]) }}">check</a></td>
                </tr>
            @endforeach
        </tbody>
    </table>
    {{ $completedTasks->links() }}
</div>

@endsection
