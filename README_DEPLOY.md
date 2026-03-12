# Green Garden Café Website - Deploy Guide

## Cách deploy lên Vercel

1. **Push code lên GitHub**
   ```bash
   git add .
   git commit -m "Fix Vercel deployment"
   git push origin main
   ```

2. **Deploy lên Vercel**
   - Truy cập https://vercel.com
   - Import project từ GitHub
   - Vercel sẽ tự động nhận diện cấu hình trong `vercel.json`

## Các file đã thêm/sửa để fix deployment

- `vercel.json` - Cấu hình build và rewrite cho Vercel
- `tsconfig.json` - Cấu hình TypeScript
- `tsconfig.node.json` - Cấu hình TypeScript cho Node.js
- `.gitignore` - Loại bỏ file không cần thiết
- `package.json` - Thêm React dependencies và types

## Lệnh hữu ích

```bash
# Install dependencies
npm install

# Build locally để test
npm run build

# Preview build
npm run preview

# Start development server
npm run dev
```

## Lưu ý

- Website sử dụng Vite + React + TypeScript
- Tự động rebuild khi deploy lên Vercel
- Static assets được cache tối ưu
