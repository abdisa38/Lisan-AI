Set-Location -Path "frontend"
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
Set-Location -Path ".."

New-Item -ItemType Directory -Force -Path "backend"
Set-Location -Path "backend"
npm init -y
npm install express mongoose cors dotenv socket.io
npm install -D nodemon
