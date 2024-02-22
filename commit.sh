#!/bin/sh


# 모든 변경 사항을 스테이징
# git add .

# 특정 파일만 스테이징

read -p "Do you want to stage all files? (y/n) " stage_all
read -p "Enter commit message: " commit_message

if [ "$stage_all" = "y" ]; then
	git add .
else
	read -p "Enter File: " file_path
	git add "$file_path"
fi

git commit -m "$commit_message"

# 현재 브랜치 이름을 가져옴
current_branch=$(git rev-parse --abbrev-ref HEAD)

# 변경 사항을 원격 저장소로 푸시
git push origin $current_branch