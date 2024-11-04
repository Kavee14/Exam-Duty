<!DOCTYPE html>
<html>
<head>
    <title>Exam Duty Schedule</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        h1 {
            text-align: center;
        }
        h2 {
            text-align: center;
        }
        h3 {
            text-align: center;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
            //white-space: nowrap;
        }
        th {
            background-color: #f2f2f2;
        }

        th.date-column, td.date-column {
            width: 100px;
        }

        th.time-column, td.time-column {
            width: 100px;
        }
    </style>
</head>
<body>
<h1>University of Ruhuna</h1>
<h2>Faculty of Science</h2>
<h3>B.Sc. (Genaral) Degree Level I and Level II(Semester I) Examination-2023/2024 - 03.10.2024 - 6.11.2024</h3>
<h3>Exam Duty Time Table</h3>
<table>
    <thead>
    <tr>
        <th>Date</th>
        <th>Time</th>
        <th>Course Code</th>

        <th>Exam Hall</th>
    </tr>
    </thead>
    <tbody>
    @foreach($duties as $duty)
        <tr>
            <td class="date-column">{{ \Carbon\Carbon::parse($duty->duty_date)->format('Y-m-d') }}</td>
            <td class="time-column">{{ \Carbon\Carbon::parse($duty->start_time)->format('H:i') }} - {{ \Carbon\Carbon::parse($duty->end_time)->format('H:i') }}</td>
            <td>{{ $duty->course_code }}</td>
            <td>{{ $duty->exam_hall }}</td>
        </tr>

    @endforeach
    </tbody>
</table>
</body>
</html>
