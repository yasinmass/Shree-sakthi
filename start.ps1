Write-Host "Starting UniAgent..."

# Start Django backend first
Start-Process powershell -ArgumentList `
  "-NoExit", "-Command", `
  "cd uniagent_backend; python manage.py runserver 127.0.0.1:8000"

# Wait 3 seconds for backend to start
Start-Sleep -Seconds 3

# Then start React frontend
Start-Process powershell -ArgumentList `
  "-NoExit", "-Command", `
  "npm run dev"

Write-Host "Backend: http://127.0.0.1:8000"
Write-Host "Frontend: http://localhost:3000"
