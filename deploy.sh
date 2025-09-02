#!/bin/bash

echo "🍕 Pineapple on Pizza - $PNPL Deployment Script"
echo "================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🚀 Choose your deployment option:"
echo "1. Local development server"
echo "2. Netlify (drag & drop)"
echo "3. Vercel"
echo "4. GitHub Pages"
echo "5. Firebase Hosting"
echo "6. Just build for static hosting"
echo ""

read -p "Enter your choice (1-6): " choice

case $choice in
    1)
        echo "🌐 Starting local development server..."
        echo "📱 Open http://localhost:3000 in your browser"
        npm start
        ;;
    2)
        echo "📤 Netlify Deployment Instructions:"
        echo "1. Go to https://netlify.com"
        echo "2. Drag and drop this entire folder"
        echo "3. Your site will be live instantly!"
        echo ""
        echo "📁 Files ready for Netlify:"
        ls -la
        ;;
    3)
        echo "📤 Vercel Deployment:"
        if ! command -v vercel &> /dev/null; then
            echo "📦 Installing Vercel CLI..."
            npm install -g vercel
        fi
        echo "🚀 Deploying to Vercel..."
        vercel
        ;;
    4)
        echo "📤 GitHub Pages Deployment:"
        echo "1. Push this folder to a GitHub repository"
        echo "2. Go to repository Settings > Pages"
        echo "3. Set source to 'Deploy from a branch'"
        echo "4. Select 'main' branch and '/ (root)' folder"
        echo "5. Click Save"
        ;;
    5)
        echo "📤 Firebase Hosting:"
        if ! command -v firebase &> /dev/null; then
            echo "📦 Installing Firebase CLI..."
            npm install -g firebase-tools
        fi
        echo "🚀 Initializing Firebase..."
        firebase init hosting
        echo "📤 Deploying to Firebase..."
        firebase deploy
        ;;
    6)
        echo "📦 Building for static hosting..."
        echo "✅ Your files are ready for static hosting!"
        echo ""
        echo "📁 Files to upload:"
        echo "- index.html"
        echo "- app.jsx"
        echo ""
        echo "🌐 You can upload these files to any static hosting service."
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment complete!"
echo "🍍 + 🍕 = $PNPL"
