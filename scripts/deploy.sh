#!/bin/bash

set -e

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 환경 변수
DOCKER_COMPOSE_FILE="docker-compose.yml"
IMAGE_NAME="ghcr.io/${GITHUB_REPOSITORY_OWNER}/frontend:latest"

# 로그 함수
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 현재 활성화된 컨테이너 확인
get_active_container() {
    if docker ps | grep -q "frontend-blue"; then
        echo "blue"
    elif docker ps | grep -q "frontend-green"; then
        echo "green"
    else
        echo "none"
    fi
}

# 대상 컨테이너 결정
get_target_container() {
    local active=$1
    if [ "$active" == "blue" ]; then
        echo "green"
    elif [ "$active" == "green" ]; then
        echo "blue"
    else
        # 둘 다 없으면 blue를 먼저 시작
        echo "blue"
    fi
}

# 컨테이너 포트 가져오기
get_container_port() {
    local container=$1
    if [ "$container" == "blue" ]; then
        echo "3001"
    else
        echo "3002"
    fi
}

# 메인 배포 로직
main() {
    log_info "=========================================="
    log_info "Blue-Green 배포 시작"
    log_info "=========================================="
    
    # 현재 활성 컨테이너 확인
    ACTIVE_CONTAINER=$(get_active_container)
    TARGET_CONTAINER=$(get_target_container $ACTIVE_CONTAINER)
    TARGET_PORT=$(get_container_port $TARGET_CONTAINER)
    
    log_info "현재 활성 컨테이너: ${ACTIVE_CONTAINER}"
    log_info "배포 대상 컨테이너: ${TARGET_CONTAINER}"
    log_info "배포 대상 포트: ${TARGET_PORT}"
    
    # 최신 이미지 pull
    log_info "최신 이미지 다운로드 중..."
    docker pull $IMAGE_NAME
    
    # 대상 컨테이너가 실행 중이면 중지
    if docker ps -a | grep -q "frontend-${TARGET_CONTAINER}"; then
        log_info "기존 ${TARGET_CONTAINER} 컨테이너 중지 및 제거 중..."
        docker-compose stop frontend-${TARGET_CONTAINER}
        docker-compose rm -f frontend-${TARGET_CONTAINER}
    fi
    
    # 새 컨테이너 시작
    log_info "${TARGET_CONTAINER} 컨테이너 시작 중..."
    docker-compose up -d frontend-${TARGET_CONTAINER}
    
    log_info "${TARGET_CONTAINER} 컨테이너 배포 완료!"
    
    # 이전 컨테이너 정리 (옵션)
    if [ "$ACTIVE_CONTAINER" != "none" ]; then
        read -p "이전 컨테이너(${ACTIVE_CONTAINER})를 중지하시겠습니까? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            log_info "${ACTIVE_CONTAINER} 컨테이너 중지 중..."
            docker-compose stop frontend-${ACTIVE_CONTAINER}
            docker-compose rm -f frontend-${ACTIVE_CONTAINER}
            log_info "${ACTIVE_CONTAINER} 컨테이너 정리 완료"
        else
            log_warn "${ACTIVE_CONTAINER} 컨테이너는 계속 실행됩니다."
        fi
    fi
    
    # 상태 확인
    log_info "=========================================="
    log_info "배포 완료!"
    log_info "=========================================="
    log_info "실행 중인 컨테이너:"
    docker ps --filter "name=frontend" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    
    log_info ""
    log_info "접속 정보:"
    if [ "$TARGET_CONTAINER" == "blue" ]; then
        log_info "Blue: http://localhost:3001"
    else
        log_info "Green: http://localhost:3002"
    fi
}

# 스크립트 실행
main