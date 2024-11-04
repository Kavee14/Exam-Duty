<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exam Duty Reminder</title>
</head>
<body>
<h2>Reminder: Upcoming Duty on {{ \Carbon\Carbon::parse($duty->duty_date)->format('d M Y') }}</h2>
<p>Dear {{ $lecturer->name }},</p>
<p>This is a reminder that you have an upcoming exam duty on {{ \Carbon\Carbon::parse($duty->duty_date)->format('d M Y') }}.</p>
<p>Details:</p>
<ul>
    <li>Course Code: {{ $duty->course_code }}</li>
    <li>Time: {{ \Carbon\Carbon::parse($duty->start_time)->format('H:i') }} - {{ \Carbon\Carbon::parse($duty->end_time)->format('H:i') }}</li>
    <li>Location: {{ $duty->exam_hall }}</li>
</ul>
<p>If you are unable to attend, please click the "Request" button on the system to request a change.</p>
</body>
</html>
